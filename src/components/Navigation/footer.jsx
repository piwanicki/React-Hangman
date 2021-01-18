// import React from "react"
// import styled from "styled-components"
// import { Navbar, Nav } from "react-bootstrap"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import {
//   faHome,
//   faWindowRestore,
//   faLayerGroup,
//   faUserSecret,
// } from "@fortawesome/free-solid-svg-icons"
// import { faEnvelope } from "@fortawesome/free-regular-svg-icons"
// import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons"
// import textContent from "../textContent/textContent"
// import { connect } from "react-redux"
// import px2vw from "../utils/px2vw"
// import { SHOW_MODAL } from "../state/actions"

// const Container = styled.div`
//   margin: auto;
//   position: absolute;
//   bottom: 5px;

//   .navbar {
//     font-size: 2em;

//     .github-link {
//       &:hover {
//         svg {
//           color: #fff !important;
//         }
//       }
//     }

//     .linkedin-link {
//       &:hover {
//         svg {
//           color: #0077b5 !important;
//         }
//       }
//     }

//     a {
//       margin: 0 10px;
//       transition: transform 1s;
//       &:hover {
//         transition: transform 1s;
//         transform: scale(1.3);
//       }
//       span {
//         margin-left: 10px;
//         font-size: 1.2rem;
//       }
//     }

//     .nav-link.active {
//       /* font-size: 1.3em; */
//       color: #4f8a8b;
//       transform: scale(1.3);
//       margin: 0 20px;

//       @media (min-width: 769px) and (max-width: 940px) {
//         margin: 0 10px;
//         span {
//           display: inline-block;
//         }
//       }
//     }

//     @media (min-width: 769px) and (max-width: 940px) {
//       span {
//         display: none;
//       }
//     }

//     @media (min-width: 940px) and (max-width: 1240px) {
//       font-size: ${px2vw(20)};
//       padding-left: 0;
//       padding-right: 0;
//     }

//     @media (max-width: 769px) {
//       display: none;
//     }
//   }
// `

// const Footer = props => {
//   const text = textContent[props.lang]
//   return (
//     <Container>
//       <Navbar variant="dark">
//         <Nav activeKey={props.active}>
//           <Nav.Link href="/">
//             <FontAwesomeIcon icon={faHome} />
//             <span id="nav-home">{text.home}</span>
//           </Nav.Link>
//           <Nav.Link href="/about">
//             <FontAwesomeIcon icon={faUserSecret} />
//             <span id="nav-about">{text.headerAbout}</span>
//           </Nav.Link>
//           <Nav.Link href="/projects">
//             <FontAwesomeIcon icon={faWindowRestore} />
//             <span id="nav-projects">{text.headerProjects}</span>
//           </Nav.Link>
//           <Nav.Link href="/technologies">
//             <FontAwesomeIcon icon={faLayerGroup} />
//             <span id="nav-technologies">{text.mainTechHeader}</span>
//           </Nav.Link>
//           <Nav.Link
//             href="https://github.com/piwanicki/"
//             target="_blank"
//             rel="norefferer"
//             className="github-link"
//           >
//             <FontAwesomeIcon icon={faGithub} />
//             <span id="nav-github">Github</span>
//           </Nav.Link>
//           <Nav.Link
//             href="https://www.linkedin.com/in/paweliwanicki92/"
//             target="_blank"
//             rel="norefferer"
//             className="linkedin-link"
//           >
//             <FontAwesomeIcon icon={faLinkedin} />
//             <span id="nav-linkedin">Linkedin</span>
//           </Nav.Link>
//           <Nav.Link
//             onClick={() => props.setContactModalShow()}
//           >
//             <FontAwesomeIcon icon={faEnvelope} />
//             <span id="nav-contact">{text.headerContact}</span>
//           </Nav.Link>
//         </Nav>
//       </Navbar>
//     </Container>
//   )
// }

// const mapStateToProps = state => {
//   return {
//     lang: state.lang,
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     setContactModalShow: () => dispatch({ type: SHOW_MODAL }),
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Footer)
