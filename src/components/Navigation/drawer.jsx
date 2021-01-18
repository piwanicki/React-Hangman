// import React from "react"
// import clsx from "clsx"
// import { makeStyles } from "@material-ui/core/styles"
// import Drawer from "@material-ui/core/Drawer"
// import List from "@material-ui/core/List"
// import Divider from "@material-ui/core/Divider"
// import ListItem from "@material-ui/core/ListItem"
// import ListItemIcon from "@material-ui/core/ListItemIcon"
// import ListItemText from "@material-ui/core/ListItemText"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import {
//   faWindowRestore,
//   faLayerGroup,
//   faUserSecret,
//   faHome,
//   faEnvelope
// } from "@fortawesome/free-solid-svg-icons"
// import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"
// import { Link } from "gatsby"
// import styled from "styled-components"
// import { connect } from "react-redux"
// import textContent from "../textContent/textContent"
// import Languages from "./Languages"
// import "../styles/drawer.scss"
// import {SHOW_MODAL} from '../state/actions'

// const ListContainer = styled.div`
//   color: #adadad;
//   svg {
//     color: #adadad;
//   }

//   a {
//     color: #adadad;
//     text-decoration: none;
//   }

//   .MuiListItem-button {
//     &:active {
//     }
//   }
// `

// const useStyles = makeStyles(theme => ({
//   list: {
//     width: 250,
//   },
//   fullList: {
//     width: "auto",
//   },
//   nested: {
//     paddingLeft: theme.spacing(4),
//   },
// }))

// const MobileDrawer = props => {
//   const classes = useStyles()
//   const text = textContent[props.lang]

//   return (
//     <Drawer anchor='right' open={props.open} onClose={() => props.toggleDrawer(false)}>
//       <ListContainer
//         className={clsx(classes.list)}
//         role="presentation"
//         onClick={() => props.toggleDrawer(false)}
//         onKeyDown={() => props.toggleDrawer(false)}
//       >
//         <List>
//           <Link to="/">
//             <ListItem button key={"home"}>
//               <ListItemIcon>
//                 <FontAwesomeIcon icon={faHome} />
//               </ListItemIcon>
//               <ListItemText primary={text.home} />
//             </ListItem>
//           </Link>
//           <Divider />
//           <Link to="/about">
//             <ListItem button key={"about"}>
//               <ListItemIcon>
//                 <FontAwesomeIcon icon={faUserSecret} />
//               </ListItemIcon>
//               <ListItemText primary={text.headerAbout} />
//             </ListItem>
//           </Link>
//           <Divider />
//           <Link to="/projects">
//             <ListItem button key={"projects"}>
//               <ListItemIcon>
//                 <FontAwesomeIcon icon={faWindowRestore} />
//               </ListItemIcon>
//               <ListItemText primary={text.headerProjects} />
//             </ListItem>
//           </Link>
//           <Divider />
//           <Link to="/technologies">
//             <ListItem button key={"tech"}>
//               <ListItemIcon>
//                 <FontAwesomeIcon icon={faLayerGroup} />
//               </ListItemIcon>
//               <ListItemText primary={text.headerTech} />
//             </ListItem>
//             <Divider />
//           </Link>
//           <a
//             href="https://github.com/piwanicki"
//             target="_blank"
//             className="github"
//             rel="noreferrer"
//           >
//             <ListItem button key={"github"}>
//               <ListItemIcon>
//                 <FontAwesomeIcon icon={faGithub} />
//               </ListItemIcon>
//               <ListItemText primary={"Github"} />
//             </ListItem>
//           </a>
//           <Divider />
//           <a
//             href="https://www.linkedin.com/in/paweliwanicki92/"
//             target="_blank"
//             className="linkedin"
//             rel="noreferrer"
//           >
//             <ListItem button key={"linkedin"}>
//               <ListItemIcon>
//                 <FontAwesomeIcon icon={faLinkedin} />
//               </ListItemIcon>
//               <ListItemText primary={"Linkedin"} />
//             </ListItem>
//           </a>
//           <Divider />
//           <ListItem button key={"contact"} onClick={props.setContactModalShow}> 
//               <ListItemIcon>
//                 <FontAwesomeIcon icon={faEnvelope} />
//               </ListItemIcon>
//               <ListItemText primary={text.headerContact} />
//             </ListItem>
//         </List>
//       </ListContainer>
//       <Languages />
//     </Drawer>
//   )
// }


// const mapStateToProps = state => {
//   return {
//     lang: state.lang
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     setContactModalShow: () =>  dispatch({type: SHOW_MODAL})
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(MobileDrawer)
