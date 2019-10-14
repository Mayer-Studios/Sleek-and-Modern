
function mySettings(props) {
  return (
//import { units } from "user-settings";
//console.log(units.temperature);

<Page>

  
  <Section
   title={<Text bold align="center">Sleek And Modern Settings:  </Text>}>
    <Select
  label={`Upper Left`}
  settingsKey="upperLeftStat"
  options={[
    {name:"Steps"},
    {name:"Heart Rate"},
    {name: "Resting Heart Rate"},
    {name: "Calories"},
    {name: "Active Minutes"},
    {name: "Floors"},
    {name: "Activity Score"},
    {name: "Blank"}
  ]}
/>
    <Select
  label={`Upper Right`}
  settingsKey="upperRight"
  options={[
   {name:"Steps"},
    {name:"Heart Rate"},
    {name: "Resting Heart Rate"},
    {name: "Calories"},
    {name: "Active Minutes"},
    {name: "Floors"},
    {name: "Activity Score"},
    {name: "Blank"}
  ]}
/>
    <Text> Text Color: </Text>
    <ColorSelect
          settingsKey="textColor"
          colors={[
            {color: 'black'}, 
            {color: 'white'},
            {color: 'whitesmoke'},
            {color: 'wheat'},
            {color: 'darkred'},
            {color: 'firebrick'},
            {color: 'indigo'},
            {color: 'royalblue'},
            {color: 'brown'},
            {color: 'darkmagenta'},
            {color: 'olive'},
            {color: 'darkviolet'},
            {color: 'aquamarine'},
            {color: 'chartreuse'},            
            {color: 'gold'},            
            {color: 'khaki'},
            {color: 'lawngreen'}, 
            {color: 'springgreen'},
            {color: 'lightseagreen'},
            {color: 'red'},
            {color: 'thistle'},
            {color: 'darkturquoise'},
            {color: 'lightsalmon'},
            {color: 'lightcoral'},
            {color: 'lightskyblue'},
            {color: 'orange'},
            {color: 'pink'},
            {color: 'yellow'}
                     ]}
        />
    <Text> Background Color:</Text>
    <ColorSelect
          settingsKey="backColor"
          colors={[
            {color: 'black'}, 
            {color: 'white'},
            {color: 'whitesmoke'},
            {color: 'wheat'},
            {color: 'darkred'},
            {color: 'firebrick'},
            {color: 'indigo'},
            {color: 'royalblue'},
            {color: 'brown'},
            {color: 'darkmagenta'},
            {color: 'olive'},
            {color: 'darkviolet'},
            {color: 'aquamarine'},
            {color: 'chartreuse'},            
            {color: 'gold'},            
            {color: 'khaki'},
            {color: 'lawngreen'}, 
            {color: 'springgreen'},
            {color: 'lightseagreen'},
            {color: 'red'},
            {color: 'thistle'},
            {color: 'darkturquoise'},
            {color: 'lightsalmon'},
            {color: 'lightcoral'},
            {color: 'lightskyblue'},
            {color: 'orange'},
            {color: 'pink'},
            {color: 'yellow'}
                     ]}
        />
    <Text>Select color for the clock hands</Text> 
    <ColorSelect
          settingsKey="clockColor"
          colors={[
            {color: 'black'}, 
            {color: 'white'},
            {color: 'whitesmoke'},
            {color: 'wheat'},
            {color: 'darkred'},
            {color: 'firebrick'},
            {color: 'indigo'},
            {color: 'royalblue'},
            {color: 'brown'},
            {color: 'darkmagenta'},
            {color: 'olive'},
            {color: 'darkviolet'},
            {color: 'aquamarine'},
            {color: 'chartreuse'},            
            {color: 'gold'},            
            {color: 'khaki'},
            {color: 'lawngreen'}, 
            {color: 'springgreen'},
            {color: 'lightseagreen'},
            {color: 'red'},
            {color: 'thistle'},
            {color: 'darkturquoise'},
            {color: 'lightsalmon'},
            {color: 'lightcoral'},
            {color: 'lightskyblue'},
            {color: 'orange'},
            {color: 'pink'},
            {color: 'yellow'}
                     ]}
        />
  
    
   </Section>
  
  
    


  <Section
   title={<Text bold align="center">Information About Sleek And Modern</Text>}>
    <Link source="https://mayer-studios.com">Mayer Studios Home Page</Link> 
    <Link source="https://openweathermap.org">Powered by Open Weather Map</Link>

    
    
    <Text>© 2018-2019 Mayer Studios All rights reserved. </Text>
       
    </Section>
  
  
</Page>
     );
}

registerSettingsPage(mySettings);