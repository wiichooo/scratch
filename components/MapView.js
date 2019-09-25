import React, { Component } from 'react';
import {Button, Form, Col, Row, InputGroup, FormControl} from 'react-bootstrap';
import Thought from "./Thought";
import DataForm from "./DataForm"
import CountryInfo from './CountryInfo';

class map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: '',
      visited: [],
      data: [],
      map: false,
      info: null,
      selected: null
    };
    this.changeSelected = this.changeSelected.bind(this)
    this.setVisited = this.setVisited.bind(this)
    global.chart;
    global.visited;

  }
  static getDerivedStateFromProps(props, state) {
    console.log(state)
    console.log(props)
    if (state.visited.length < props.visited.length) {
      var allIds = props.visited.map(function (d) {
        return (d.id)
      })
      // console.log(allIds)
      if (state.data.length > 0)
        return state = {
          visited: [state.visited, ...allIds],
          data: [state.data, ...props.visited]
        };
      else
        return state = {
          visited: [state.visited, ...allIds],
          data: props.visited
        };
    }
    return null
  }
  componentDidMount() {
    /* Create map instance */
    global.chart = am4core.create("chartdiv", am4maps.MapChart);

    //let selected = '';
    /* Set map definition */
    global.chart.geodata = am4geodata_worldLow;

    /* Set projection */
    global.chart.projection = new am4maps.projections.Miller();


    /* Create map polygon series */
    let polygonSeries = global.chart.series.push(new am4maps.MapPolygonSeries());

    /* Make map load polygon (like country names) data from GeoJSON */
    polygonSeries.useGeodata = true;
    polygonSeries.name = 'World'

    /* Configure series */
    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.applyOnClones = true;
    polygonTemplate.togglable = true;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.nonScalingStroke = true;
    polygonTemplate.strokeOpacity = 0.5;
    polygonTemplate.fill = chart.colors.getIndex(0);
    var lastSelected;
    polygonTemplate.events.on("hit", function (ev) {
      if (lastSelected) {

        this.changeSelected(ev.target.dataItem.dataContext.id,
          ev.target.dataItem.dataContext.name);
        //selected(ev.target.dataItem.dataContext.name);
        lastSelected.isActive = false;
      }
      ev.target.series.chart.zoomToMapObject(ev.target, 3);
      if (lastSelected !== ev.target) {
        lastSelected = ev.target;
      }
      //changeSelected(lastSelected);
    }, this)


    /* Create selected and hover states and set alternative fill color */
    var ss = polygonTemplate.states.create("active");
    ss.properties.fill = chart.colors.getIndex(2);

    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = chart.colors.getIndex(4);

    // Hide Antarctica
    polygonSeries.exclude = ["AQ"];

    // Small map
    chart.smallMap = new am4maps.SmallMap();
    // Re-position to top right (it defaults to bottom left)
    chart.smallMap.align = "right";
    chart.smallMap.valign = "top";
    chart.smallMap.series.push(polygonSeries);

    // Zoom control
    chart.zoomControl = new am4maps.ZoomControl();

    var homeButton = new am4core.Button();
    homeButton.events.on("hit", function () {
      chart.goHome();
    });

    homeButton.icon = new am4core.Sprite();
    homeButton.padding(7, 5, 7, 5);
    homeButton.width = 30;
    homeButton.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
    homeButton.marginBottom = 10;
    homeButton.parent = chart.zoomControl;
    homeButton.insertBefore(chart.zoomControl.plusButton);

    polygonTemplate.propertyFields.fill = "fill";


    global.chart.legend = new am4maps.Legend();
    global.chart.legend.position = "bottom";
    global.chart.legend.align = "right";

    if (this.state.visited.length > 0) {

      let visited = global.chart.series.push(new am4maps.MapPolygonSeries());

      visited.name = "Visited";
      visited.useGeodata = true;
      visited.include = this.state.visited
      visited.mapPolygons.template.tooltipText = "{name}";
      //visited.mapPolygons.template.fill = am4core.color("#ebdb8b");
      // visited.fill = am4core.color("#ebdb8b");
      var polygonTemplate = visited.mapPolygons.template;
      polygonTemplate.applyOnClones = true;
      polygonTemplate.togglable = true;
      polygonTemplate.nonScalingStroke = true;
      polygonTemplate.strokeOpacity = 0.5;
      var lastSelected;
      polygonTemplate.events.on("hit", function (ev) {
        if (lastSelected) {
          this.changeSelected(ev.target.dataItem.dataContext.id,
            ev.target.dataItem.dataContext.name);

          //console.log(this.state)
          //selected(ev.target.dataItem.dataContext.name);
          lastSelected.isActive = false;
        }
        ev.target.series.chart.zoomToMapObject(ev.target, 3);
        if (lastSelected !== ev.target) {
          lastSelected = ev.target;
        }
        //changeSelected(lastSelected);
      }, this)

      visited.data = this.state.data
      console.log(visited.data)
      polygonTemplate.propertyFields.fill = "fill";
    }

  };

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  };

  changeSelected(id, name) {
    fetch(`https://restcountries.eu/rest/v2/alpha/${id}`)
        .then(res => res.json())
        .then((data) => {
            //this.setState({ data: data })
            this.setState({
              id: id,
              name: name,
              selected: this.state.data.find(function(element) {
                return element.id==id;
              }),
              map: false,
              info: data
            })
        })
        .catch(console.log)
    
   // console.log(this.state)

  };

  setVisited(id, name, visited, wishlist, comment, date, fill, _id) {
    let data1 = {
      "id": id,
      "name": name,
      "visited": visited,
      "wishlist": wishlist,
      "comment": comment,
      "date": date,
      "fill": fill,
      "_id": _id
    }


    this.save(data1, id)

  };

  async save(data, id) {
    //event.preventDefault();
    const response = await fetch("/api/visited", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data
      })
    })
    let country = await response.json()
    console.log(country.body)
    this.setState({
      data: [country.body, ...this.state.data],
      visited: [id, ...this.state.visited],
      id: '',
      name: '',
      map: true
    });
    //  Router.push("/");
  }

  componentDidUpdate(prevState) {
    if (this.state.map) {
      if (global.chart.series.length > 1) {
        //   console.log(global.chart.series)
        global.chart.series.removeIndex(1).dispose();
        // console.log(global.chart.series)
      }

      let visited = global.chart.series.push(new am4maps.MapPolygonSeries());
      visited.name = "Visited";
      visited.useGeodata = true;
      visited.include = this.state.visited
      visited.mapPolygons.template.tooltipText = "{name}";
      visited.mapPolygons.template.fill = am4core.color("#96BDC6");
      visited.fill = am4core.color("#ebdb8b");
      var polygonTemplate = visited.mapPolygons.template;
      polygonTemplate.applyOnClones = true;
      polygonTemplate.togglable = true;
      polygonTemplate.nonScalingStroke = true;
      polygonTemplate.strokeOpacity = 0.5;
      var lastSelected;
      polygonTemplate.events.on("hit", function (ev) {
        if (lastSelected) {
          this.changeSelected(ev.target.dataItem.dataContext.id,
            ev.target.dataItem.dataContext.name);

          //console.log(ev.target.dataItem.dataContext)
          //selected(ev.target.dataItem.dataContext.name);
          lastSelected.isActive = false;
        }
        ev.target.series.chart.zoomToMapObject(ev.target, 3);
        if (lastSelected !== ev.target) {
          lastSelected = ev.target;
        }
        //changeSelected(lastSelected);
      }, this)
      console.log(this.state.data)
      visited.data = this.state.data
      polygonTemplate.propertyFields.fill = "fill";
    }
  }

  render() {
     // var polygonSeries;
     //console.log('render 2')
     //console.log(this.state.selected)
    return (
      <Col className='whiteBackgroud'>
        <Row>
          <div id="chartdiv" style={{ width: "100%", height: "500px", backgroundColor:'white' }}></div>
        </Row>
        <Row className='cardscontainer'>
          {this.state.id ? 
          <>
            <DataForm id={this.state.id} name={this.state.name} selected={this.state.selected} onChange={this.setVisited}/>
            <CountryInfo id={this.state.id} name={this.state.name} data={this.state.info}/>
          </>
          :null}
        </Row>
      </Col>
    );
  }
}

export default map;