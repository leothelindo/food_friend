export const longLat = (location) => {
    var long = location["coords"].longitude
    var lat = location["coords"].latitude

    return [long, lat]
}

//Searches the Yelp API for businesses near the user with the keyword delivery. 
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
export function formatCategories(categories){

    let output = ""
    categories.forEach(element => {
        output += element.title
        output += " "
      });

    return output
}