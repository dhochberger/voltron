/*!

=========================================================
* Now UI Dashboard React - v1.5.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2021 Voltron (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/main/LICENSE.md)

* Coded by Voltron

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Label,
  CardTitle,
  CardFooter,
} from "reactstrap";
import adminStyles from '../assets/css/admin.css';

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import sensorApi from "api/sensorApi";
import { Line } from "react-chartjs-2";

const buildChartData = (res, label, color, gradient) => {
  const data = (canvas) => {
    var ctx = canvas.getContext("2d");

    var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, '#80b6f4');
    gradientStroke.addColorStop(1, '#FFFFFF');

    var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
    gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    gradientFill.addColorStop(1, gradient);
    return {
      labels: res.map(e => {
        let time = new Date(e.createdAt);
        return `${time.getHours()}:${time.getMinutes()}`
      }),
      datasets: [{
        label: label,
        borderColor: color,
        pointBorderColor: "#FFF",
        pointBackgroundColor: color,
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 4,
        fill: true,
        backgroundColor: gradientFill,
        borderWidth: 2,
        tension: 0.4,
        data: res.map(e => e.value ? e.value : e.valueC),
      }]
    }
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10,
      },
    },
    responsive: 1,
    scales: {
      y: {
        grid: {
          zeroLineColor: "transparent",
          drawBorder: false,
        },
        ticks: {
          maxTicksLimit: 7,
        },
      },
      x: {
        display: 0,
        ticks: {
          display: false,
        },
        grid: {
          zeroLineColor: "transparent",
          drawTicks: false,
          display: false,
          drawBorder: false,
        },
      },
    },
    layout: {
      padding: { left: 0, right: 0, top: 15, bottom: 15 },
    },
  };
  return { data, options }
}

function Data() {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("humidity");
  const [start, setStart] = useState();
  const [end, setEnd] = useState(new Date().toJSON().slice(0, 19));
  const [data, setData] = useState();

  const getData = (type, start, end) => {

    if(start == undefined) return;

    let _start = formatDate(new Date(start));
    let _end = formatDate(new Date(end));
    if (type == "humidity") {
      sensorApi.getHumidityBetweenDate(_start, _end)
        .then(res => {
          setData(buildChartData(res.data.data, "Humidité", "#f96332", "#f96332"));
          setLoading(false);
        })
    }
    else if (type == "luminosity") {
      sensorApi.getLuminosityBetweenDate(_start, _end)
        .then(res => {
          setData(buildChartData(res.data.data, "Luminosité", "#18ce0f", "#18ce0f"));
          setLoading(false);
        })
    }
    else if (type == "temperature") {
      sensorApi.getTemperatureBetweenDate(_start, _end)
        .then(res => {
          setData(buildChartData(res.data.data, "Température", "#2CA8FF", "#2CA8FF"));
          setLoading(false);
        })
    }
  }

  const formatDate = (d) => {
    return d.getFullYear() + "-" + ("00" + (d.getMonth() + 1)).slice(-2) + "-" + ("00" + d.getDate()).slice(-2) + "T" + ("00" + d.getHours()).slice(-2) + ":" + ("00" + d.getMinutes()).slice(-2) + ":" + ("00" + d.getSeconds()).slice(-2) + "Z";
  }

  const onChangeType = e => {
    setType(e.target.value);
    getData(e.target.value, start, end);
  };
  const onChangeStart = e => {
    setStart(e.target.value);
    getData(type, e.target.value, end);
  };
  const onChangeEnd = e => {
    setEnd(e.target.value);
    getData(type, start, e.target.value);
  }

  return (
    <>
        <Row>
          <Col xs={12} md={12}>
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h4">Afficher plus de données</CardTitle>
                <FormGroup id="searchData">
                  <label>Type</label>
                  <Input type="select" name="type" id="type" value={type} onChange={onChangeType}>
                    <option value="humidity">Humidité</option>
                    <option value="luminosity">Luminosité</option>
                    <option value="temperature">Température</option>
                  </Input>
                  <label>Début</label>
                  <Input
                    placeholder="Début"
                    type="datetime-local"
                    value={start}
                    onChange={onChangeStart}
                    max={end}
                  />
                  <label>Fin</label>
                  <Input
                    placeholder="Fin"
                    type="datetime-local"
                    value={end}
                    onChange={onChangeEnd}
                    min={start}
                    max={new Date().toJSON().slice(0, 19)}
                  />
                </FormGroup>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  {
                    data && <Line
                      data={data.data}
                      options={data.options}
                    />
                  }
                </div>
              </CardBody>
              {
                loading && <CardFooter>
                  <div className="stats">
                    <i className="now-ui-icons loader_refresh spin" /> Chargement
                  </div>
                </CardFooter>
              }
            </Card>
          </Col>
        </Row>
    </>
  );
}

export default Data;
