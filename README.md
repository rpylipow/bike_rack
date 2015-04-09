# Chicago Bike Racks

Node app to find bike rack in Chicago Neighborhoods. Currently, this is only showing
racks in the loop neighborhood, but I'm planning on adding more soon.

## Resources 
- [open data api](http://dev.socrata.com/foundry/#/data.cityofchicago.org/cbyb-69xx) 
- [Mapbox.js](https://www.mapbox.com/mapbox.js/api/v2.1.6/)

## Get Started
- Clone
- Run `npm i` to install node modules
- Run `bower i` to install bower components
- Run `npm start` which will automatically run the default `grunt` task 
compiling coffeescript from the `src/` directory into javascript in the 
`client/` directory. Then, a node server will start on `localhost:3000`.
- Changes to files in the `templates/` and `stylesheet` directorys will 
re-compile on the fly. If you'd like to make changes to the coffeescripts, run
`grunt watch` in another terminal window.

## To deploy to [surge](https://surge.sh/)
- Run `npm -g surge` to install surge.
- In `dev_config.json`, change `isDev` to `false`.
- Run `npm start` which will serve minified assets and create a `_build` 
directory.
- In terminal run `surge _build/`.
