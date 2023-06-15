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
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

import {
  dashboardPanelChart,
} from "variables/charts.js";
import sensorApi from "api/sensorApi";

import Data from "./Data";

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

function Dashboard() {
  const [humidity, setHumidity] = useState();
  const [luminosity, setLuminosity] = useState();
  const [temperature, setTemperature] = useState();

  useEffect(() => {
    let start = formatDate(new Date(new Date().getTime() - 60 * 60 * 24 * 1000));
    let end = formatDate(new Date());
    Promise.all([sensorApi.getHumidityBetweenDate(start,end), sensorApi.getLuminosityBetweenDate(start,end), sensorApi.getTemperatureBetweenDate(start,end)])
      .then(res => {
        setHumidity(buildChartData(res[0].data.data, "Humidité", "#f96332", "#f96332"))
        setLuminosity(buildChartData(res[1].data.data, "Luminosité", "#18ce0f", "#18ce0f"))
        setTemperature(buildChartData(res[2].data.data, "Température", "#2CA8FF", "#2CA8FF"))
      })
      .catch(() => { })
  }, [])

  const formatDate = (d) => {
    return d.getFullYear() + "-" + ("00" + (d.getMonth() + 1)).slice(-2) + "-" + ("00" + d.getDate()).slice(-2) + "T" + ("00" + d.getHours()).slice(-2) + ":" + ("00" + d.getMinutes()).slice(-2) + ":" + ("00" + d.getSeconds()).slice(-2) + "Z";
  }

  return (
    <>
      <PanelHeader
        size="lg"
        content={
          <Line
            data={dashboardPanelChart.data}
            options={dashboardPanelChart.options}
          />
        }
      />
      <div className="content">
        <Row>
          <Col xs={12} md={4}>
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Dernières 24h</h5>
                <CardTitle tag="h4">Humidités</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  {
                    humidity && <Line
                      data={humidity.data}
                      options={humidity.options}
                    />
                  }
                </div>
              </CardBody>
              <CardFooter>
                <div className="stats">
                  <i className="now-ui-icons arrows-1_refresh-69" /> Mise à jour récente
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Dernières 24h</h5>
                <CardTitle tag="h4">Luminosités</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  {
                    luminosity && <Line
                      data={luminosity.data}
                      options={luminosity.options}
                    />
                  }
                </div>
              </CardBody>
              <CardFooter>
                <div className="stats">
                  <i className="now-ui-icons arrows-1_refresh-69" /> Mise à jour récente
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Dernières 24h</h5>
                <CardTitle tag="h4">Températures</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  {
                    temperature && <Line
                      data={temperature.data}
                      options={temperature.options}
                    />
                  }
                </div>
              </CardBody>
              <CardFooter>
                <div className="stats">
                  <i className="now-ui-icons arrows-1_refresh-69" /> Mise à jour récente
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Data />
      </div>
    </>
  );
}

export default Dashboard;
