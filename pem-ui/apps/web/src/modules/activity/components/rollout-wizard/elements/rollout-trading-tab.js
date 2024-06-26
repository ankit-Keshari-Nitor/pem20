import React, { useEffect, useState } from 'react';
import { Grid, Column, TextInput, Checkbox, Select, SelectItem, Button } from '@carbon/react';
import './../../style.scss';
import * as RolloutService from '../../../services/rollout-service';

export default function RolloutTradingTab({ handleAddPartners }) {
  const [selectedPartnerType, setSelectedPartnerType] = useState('');
  const [partnerList, setPartnerList] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedPartners, setSelectedPartners] = React.useState([]);
  const [selectedPartnersData, setSelectedPartnersData] = React.useState([]);

  useEffect(() => {
    getTradingPartnerList(selectedPartnerType);
  }, [selectedPartnerType]);

  const getTradingPartnerList = (type) => {
    RolloutService.getPartnerList(type).then((data) => {
      setPartnerList(data);
    });
  };

  // TODO- Function to handle the select type input filled
  const handleOnChangeType = (e) => {
    setSelectedPartnerType(e.target.value);
    getTradingPartnerList(e.target.value);
  };

  // TODO- Function to handle the search input filled
  const handleSearchInput = (e) => {
    console.log('e.target.value', e.target.value);
  };

  const handleCheck = (item) => {
    if (!selectedPartners.includes(item.key)) {
      setSelectedPartners([...selectedPartners, item.key]);
      setSelectedPartnersData([...selectedPartnersData, item]);
    } else {
      setSelectedPartners(selectedPartners.filter((e) => e !== item.key));
      setSelectedPartnersData(selectedPartnersData.filter((e) => e.key !== item.key));
    }
  };

  const handleSelectAll = () => {
    if (isChecked) {
      setSelectedPartners([]);
      setSelectedPartnersData([]);
      setIsChecked(false);
    } else {
      const keys = partnerList.map((e) => e.key);
      setSelectedPartners([...keys]);
      setSelectedPartnersData([...partnerList]);
      setIsChecked(true);
    }
  };

  return (
    <Grid className="define-grid">
      <Column className="col-margin" lg={8}>
        <TextInput id={`trading-partners-search`} type="text" placeholder="Search by attribute type" style={{ marginTop: '1.5rem' }} onChange={handleSearchInput} />
      </Column>
      <Column className="col-margin" lg={8}>
        <Select id={`trading-partners-select`} labelText="Select an trading partners" onChange={handleOnChangeType}>
          <SelectItem value="" text="" />
          <SelectItem value="option-1" text="Company/Unique ID" />
          <SelectItem value="option-2" text="User ID" />
        </Select>
      </Column>

      {partnerList.length === 0 ? (
        <Column className="col-margin" lg={16}>
          <p id={`attribute-list-label`} className="no-data-display-text">
            No Data to Display
          </p>
        </Column>
      ) : (
        <>
          <Column className="select-all-checkbox" lg={8}>
            <Checkbox id="select_all" labelText="select_all" checked={isChecked} onChange={handleSelectAll} />
          </Column>
          {selectedPartners.length > 0 && (
            <Column className="col-margin" lg={8}>
              <Button size="sm" onClick={() => handleAddPartners(selectedPartnersData)}>
                Add
              </Button>
            </Column>
          )}
          {partnerList.map((item) => {
            return (
              <Column className="col-margin" lg={16}>
                <Checkbox id={item.key} labelText={item.value} checked={selectedPartners.includes(item.key)} onChange={() => handleCheck(item)} />
              </Column>
            );
          })}
        </>
      )}
    </Grid>
  );
}
