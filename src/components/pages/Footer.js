import React from "react";
// import react icons
import { BsFillEnvelopeFill, BsGeoAlt, BsPhone } from "react-icons/bs";
import { FaInstagram, FaTwitter, FaYoutube, FaFacebook } from "react-icons/fa";
// import footer style
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "../styles/FooterStyles";

function Footer() {
  return (
    <Box>
      <Container>
        <Row>
          <Column
            style={{ width: "100%", marginTop: "30px", marginLeft: "80px" }}
          >
            <Heading>About Us</Heading>
            <h5
              style={{
                fontSize: "16px",
                fontFamily: "Trebuchet MS",
                fontStyle: "italic",
              }}
            >
              At GO TRAIN, we believe there is a better way to book a ticket
              than going to busy stations and waiting in boring queues. <br />
              <br />
              GO TRAIN offers you to see all the available trains and book your
              trip easily by choosing the date, time, destination and number of
              tickets you need, and even pay for it online and print your
              receipt, without the need of leaving your comfortable home.
            </h5>
          </Column>
          <Column style={{ width: "100%", marginLeft: "240px" }}>
            <Heading style={{ marginLeft: "30px", marginTop: "30px" }}>
              Contact Us
            </Heading>
            <ul>
              <BsFillEnvelopeFill />{" "}
              <span style={{ fontSize: "20px", marginLeft: "7px" }}>
                Email: gotrain@gmail.com
              </span>
              <br />
              <br />
              <BsPhone />
              <span style={{ fontSize: "20px", marginLeft: "10px" }}>
                Telephone number: (+002)225564855
              </span>
              <br />
              <br />
              <BsGeoAlt />
              <span style={{ fontSize: "20px", marginLeft: "10px" }}>
                Location: 52 Street, district 9, Nasr City, Cairo, Egypt
              </span>
            </ul>
          </Column>
          <Column
            style={{ width: "100%", marginLeft: "450px", marginTop: "30px" }}
          >
            <Heading>Social Media</Heading>
            <FooterLink href="http://www.facebook.com" target="_blank">
              <i className="fab fa-facebook-f">
                <FaFacebook style={{ fontSize: "40px" }} />
              </i>
            </FooterLink>
            <FooterLink href="http://www.instagram.com" target="_blank">
              <i className="fab fa-instagram">
                <FaInstagram style={{ fontSize: "40px" }} />
              </i>
            </FooterLink>
            <FooterLink href="http://www.twitter.com" target="_blank">
              <i className="fab fa-twitter">
                <FaTwitter style={{ fontSize: "40px" }} />
              </i>
            </FooterLink>
            <FooterLink href="http://www.youtube.com" target="_blank">
              <i className="fab fa-youtube">
                <FaYoutube style={{ fontSize: "40px" }} />
              </i>
            </FooterLink>
          </Column>
        </Row>
      </Container>
      <h3 style={{ color: "grey", marginTop: "10px", fontSize: "20px" }}>
        <footer>Copyright &copy; GO TRAIN 2021</footer>
      </h3>
    </Box>
  );
}

export default Footer;
