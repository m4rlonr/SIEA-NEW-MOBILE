// import * as axios from 'axios';
import { list } from "./storage"

const axios = require('axios');

async function deviceAvailability(parms) {
  let igual = false
  var RepeatData;
 
    
    console.log(`http://${parms}/checagem`)
    const {data} = await axios.get(`http://${parms}/checagem`)
    console.log(data)
    // RepeatData = data.data
 
    // console.log(error)
    // return {
    //   status: false,
    //   data: null,
    //   message: 'Falha na verificação'
    // }
  
  // return {
  //   status: false,
  //   data: null,
  //   message: 'Falha na verificação'
  // }
  list.map(item => {
    if (item.Mac === RepeatData) {
      igual = true
    }
  })
  if (igual === false) {
    return {
      status: true,
      data: RepeatData,
      message: 'Verificação bem sucedida'
    }
  } else {
    return {
      status: false,
      data: null,
      message: 'Dispositivo já cadastrado'
    }
  }
}
async function deviceVerification(parms) {
  try {
    const { data } = await axios.get(`http://${parms}/status`)
    let dado = data.split(' - ')
    return {
      status: true,
      data: dado,
      message: 'Success'
    }
  } catch (error) {
    return {
      status: false,
      data: null,
      message: 'Verification failed'
    }
  }
}
async function moistureCheck(ip) {
  let { data } = await axios.get(`http://${ip}/humidity`)
  let leituras = data.split(' - ')
  return leituras
}
async function relayControl(ip, active, rele) {
  try {
    if (active === "true") {
      await axios.post(`http://${ip}/rele?${rele}=off`)
    } else {
      await axios.post(`http://${ip}/rele?${rele}=on`)
    }
  } catch (error) {
    console.log(error)
  }
}
async function systemActivation(ip) {
  try {
    await axios.post(`http://${ip}/ativacao`)
  } catch (error) {
    console.log(error)
  }
}

export { deviceAvailability, deviceVerification, moistureCheck, relayControl, systemActivation }