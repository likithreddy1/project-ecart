import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import {
  Input,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
  InputLabel,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "./CustomTextField";
import { commerce } from "../../lib/commerce";
import { NextWeek } from "@material-ui/icons";
function AddressForm({ checkOutToken,next }) {
  const methods = useForm();
  const { handleSubmit } = useForm();

  const [shippingCountries, setCountries] = useState([]);
  const [shippingCountry, setCountry] = useState("");
  const [shippingSubdivisions, setSubdivisions] = useState([]);
  const [shippingSubdivision, setSubdivision] = useState("");
  const [shippingOptions, setOptions] = useState([]);
  const [shippingOption, setOption] = useState("");

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    setCountries(countries);
    setCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    setSubdivisions(subdivisions);
    setSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });
    setOptions(options);
    setOption(options[0].id);
  };


  useEffect(() => {
    fetchShippingCountries(checkOutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) {
      fetchSubdivisions(shippingCountry);
    }
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision) fetchShippingOptions(checkOutToken.id, shippingCountry, shippingSubdivision);
  }, [shippingSubdivision]);
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data)=>next({ ...data, shippingCountry, shippingSubdivision, shippingOption }))}>
          <Grid container spacing={3}>
            <FormInput required name="firstName" label="First Name" />
            <FormInput required name="firstName" label="Last Name" />
            <FormInput required name="firstName" label="Address" />
            <FormInput required name="firstName" label="Email" />
            <FormInput required name="firstName" label="City" />
            <FormInput required name="firstName" label="ZIP/ Postal code" />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => setCountry(e.target.value)}
              >
                {Object.entries(shippingCountries)
                  .map(([code, name]) => ({ id: code, label: name }))
                  .map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.label}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select value={shippingSubdivision} fullWidth onChange={(e) => setSubdivision(e.target.value)}>
                {Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value={shippingOption} fullWidth onChange={(e) => setOption(e.target.value)}>
                {shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` })).map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{display:'flex',justifyContent:'space-between'}}>
            <Button variant='contained' color='secondary' component={Link} to='/cart'>Back to cart</Button>
            <Button type='submit' variant='contained' style={{backgroundColor:'#1B224A',color:'white'}} >Next</Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}

export default AddressForm;
