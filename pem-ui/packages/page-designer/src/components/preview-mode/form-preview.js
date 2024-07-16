import React, { useEffect, useState } from 'react';
import Canvas from '../canvas';
import { Form } from '@carbon/react';
import { Button } from '@carbon/react';
import './preview-mode.scss';
import { formValidation, updatePreviewChildToChildren, findChildComponentById } from '../../utils/helpers';

const FormPreview = ({ layout, renderRow, componentMapper, onFieldDelete, openPreview, dataTestid, buttonView, componentsName }) => {
  const [formRenderSchema, setFormRenderSchema] = useState([]);
  useEffect(() => {
    setFormRenderSchema([...layout]);
  }, [layout, openPreview, onFieldDelete]);

  const onChangeHandle = (path, fieldValue) => {
    const schema = updatePreviewChildToChildren(formRenderSchema, path.split('-'), { value: fieldValue });
    setFormRenderSchema(schema);
  };

  const handSubmit = () => {
    let schema = JSON.parse(JSON.stringify(formRenderSchema));
    schema = formValidation(schema);
    setFormRenderSchema(schema);
  };

  const handConditionEvent = (value, operand) => {
    operand.map((operandItem)=>{
      const conditions = findChildComponentById(formRenderSchema, operandItem).component.conditionBuilder;
      const path = componentsName.filter((item) => item.id === operandItem)[0].path;
      conditions.map((condition)=>{
        if(condition.condition === "equals"){
          if(value === condition.value){
            if(condition.operation === "showIf"){
              setFormRenderSchema((previousLayout) => updatePreviewChildToChildren(previousLayout, path, {"visible": false}));
            }
            else if(condition.operation === "disableIf"){
              setFormRenderSchema((previousLayout) => updatePreviewChildToChildren(previousLayout, path, {"visible": true}));
            }
          }else{
            setFormRenderSchema((previousLayout) => updatePreviewChildToChildren(previousLayout, path, {"visible": true}));
          }
        }
        else if(condition.condition === "doesNotEqual"){
          if(value != condition.value){
            if(condition.operation === "showIf"){
              setFormRenderSchema((previousLayout) => updatePreviewChildToChildren(previousLayout, path, {"visible": false}));
            }
            else if(condition.operation === "disableIf"){
              setFormRenderSchema((previousLayout) => updatePreviewChildToChildren(previousLayout, path, {"visible": true}));
            }
          }else{
            setFormRenderSchema((previousLayout) => updatePreviewChildToChildren(previousLayout, path, {"visible": true}));
          }
        }
        
      })
    })

  }

  return (
    <div className="view-schema-container" data-testid={dataTestid}>
      <Form aria-label="form">
        <Canvas layout={formRenderSchema} renderRow={renderRow} componentMapper={componentMapper} previewMode onChangeHandle={onChangeHandle} handConditionEvent= {handConditionEvent}/>
        {buttonView && <div className="preview-submit-btn">{formRenderSchema.length ? <Button onClick={(e) => handSubmit()}>Submit</Button> : ''}</div>}
      </Form>
    </div>
  );
};

export default FormPreview;
