import { API_ALL_LISTINGS } from "../../utils/constanst.js";

export async function getListings() {
  try {
    let response = await fetch(API_ALL_LISTINGS);
    if (!response.ok) {
      throw new Error(response.message);
    }
    response = await response.json();
    const data = response.data;
    /*  let html = "";
     response.data.map((listing) => {
          html += `
          <div></div> 
        
          `
    })  */
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}
