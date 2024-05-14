import { Button } from '@carbon/react';
import * as React from 'react';

const CarbonActionElement = ({
  className,
  handleOnClick,
  label,
  title,
  disabled,
  disabledTranslation,
  separator,
  // Props that should not be in extraProps
  testID: _testID,
  rules: _rules,
  level: _level,
  path: _path,
  context: _context,
  validation: _validation,
  ruleOrGroup: _ruleOrGroup,
  schema: _schema,
  ...extraProps
}) => (
  <Button
    className={className}
    title={disabledTranslation && disabled ? disabledTranslation.title : title}
    onClick={(e) => handleOnClick(e)}
    disabled={disabled && !disabledTranslation}
    {...extraProps}
  >
    {disabledTranslation && disabled ? disabledTranslation.label : label.split(' ').reverse().join('   ')}
  </Button>
);
export default CarbonActionElement;
