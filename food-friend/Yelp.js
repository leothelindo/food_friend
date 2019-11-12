//Extracts longitude and latitude from expo Location object 
export const longLat = (location) => {
    var long = location["coords"].longitude
    var lat = location["coords"].latitude

    return [long, lat]
}

//Searches the Yelp API for businesses near the user with the keyword delivery (which is why its named del search). 
//Returns an array of 50 buisnesses
export async function delSearch(long, lat) {

    var key = `iqmcCj-JKZ3r-lU3VOw-WkGWkvJeg52DvrMzf2tmxa83mOaBfs-58OI4If3PMF0oLUwuc9eRkGX-m3SpEoV-CizA1VGPo8BmnYVOPnsj7Fmvy_3YUw_NZ1vNbMOzXXYx`
    try {
        let response = await fetch(`https://api.yelp.com/v3/businesses/search?term=delivery&latitude=${lat}&longitude=${long}&limit=50`, 
        {
        method: 'GET',
        headers: {
          Authorization: "Bearer " + key
        }})
        let responseJson = await response.json()
        return responseJson.businesses;
    }
    catch (error) {
        console.log(error)
    }
}

//Buisnesses often have multiple categories, this extracts and formats them
//Returns formatted string of categories to be displayed
export function formatCategories(busines){

    var categories = busines.categories
    let output = ""
    categories.forEach(element => {
        output += element.title
        output += " • "
      });

    return output.substr(0, output.length-3)
}

//Buisness display adrees is stored as an array, this extracts and formates it
//Returns a formatted adress string to be displayed
export function formatAdress(busines){
    let output = ""
    var location = busines.location.display_address
    location.forEach(element => {
        output += element.substr(0, element.length-1)
        output += " "
    })
    return output
}