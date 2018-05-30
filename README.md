## webapp_phase5

Name of APP: Live_on_NY_top
Keywords: TOP, New York, Life Style
DataSets:
    -[Neighborhood Names GIS] ["https://data.cityofnewyork.us/api/views/xyye-rtrs/rows.json?accessType=DOWNLOAD"][String][Point,neighborhood,borough][299]
    -[Housing_New_York_Units_by_Building] ["https://data.cityofnewyork.us/api/views/hg8x-zxpr/rows.json?accessType=DOWNLOAD"][String,Number][community_board,latitude,longitude,extremly_low_income_units][533]
    -[Crimes in NY]["https://data.cityofnewyork.us/resource/9s4h-37hy.json?cmplnt_fr_dt=2015-12-31T00:00:00.000"][String,Number,Date][cmplnt_fr_dt,boro_nm,latitude,longitude][1090]
Description: 
    Sometimes you need a quick way to informate about a particular place, but not all the time you can find the information about that place, then you need some way to find this information to fast and simplified for the user, this APP is focused to provide information about the New York city and their different districts about the quality life in all the city.
    Map View: i.Y) the map is centrate on New York city.
              ii.Y) only separate the different districts of the city  by a border line with a same color in the fill.
    Data Visualization: i.Y)bar chart, in x axis represente the name of the district, and in the y axis represent the data of qualify about how the app rank every parameter   ii.N)         
    Interaction Form: i.Y) -A table with the boroughs and Neihborhood.
                           -You can download the table into a csv format.
                      ii.Y) -When draws the crimes in the map, only take the data what happend the day 2015/DEC/31
                            -The builds only corresponse to the Low Income Units are units with rents that are affordable to households earning 51 to 80% of the area median income (AMI).
                      iii.N) iv.N) v.N)
Test Case: Chrome,Firefox,Edge

In the last phase i expect more support from the monitors but that help was null(at least in the face-to-face support offered )