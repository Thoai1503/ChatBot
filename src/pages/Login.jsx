import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import NavBar from "../component/NavBar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const text = "WAVY TEXT EFFECT!".split("");

const Login = () => {
  return (
    <>
      <Row
        style={{
          backgroundColor: "#33FFFF",
          height: "100%",
          width: 1548,
        }}
      >
        <Col id="left" md={7} style={{ height: 660, color: "blue" }}>
          <h1 style={{ marginTop: 150, marginLeft: 50 }}>
            {text.map((char, index) => (
              <motion.span
                key={index}
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.1,
                  delay: index * 0.1, // Delay each letter
                }}
                style={{
                  display: "inline-block",
                  whiteSpace: char === " " ? "pre" : "normal",
                }}
              >
                {char}
              </motion.span>
            ))}
          </h1>
        </Col>
        <Col sm={4}>
          <Row
            style={{ marginTop: "250px", marginLeft: "40px", color: "blue" }}
          >
            <h2 className="animate-text">Chào mừng đến với chúng tôi</h2>
            <Col sm={6}>
              <Link to="/register">
                <Button
                  className="mt-5"
                  style={{ width: 250, marginLeft: 30 }}
                  variant="primary"
                  size="lg"
                >
                  Login
                </Button>
              </Link>
            </Col>
            <Col sm={5}>
              <Button
                onClick={console.log("dvcds")}
                className="mt-5"
                style={{ width: 120, marginLeft: 100 }}
                variant="secondary"
                size="lg"
                active
              >
                Register
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Login;
