import React from "react"
import { NavDropdown } from "react-bootstrap"
import { connect } from "react-redux"
import en from "./icons/en.png"
import pl from "./icons/pl.png"
import de from "./icons/de.png"
import {textContent} from "../../textContent/textContent"
import './LangSelector.scss';


const icons = {
  pl: pl,
  en: en,
  de: de,
}

const LangButton = props => {
  const langSelectHandler = e => {
    const lang = e.target.dataset.lang
    const dropdown = document.querySelector("#nav-dropdown")
    dropdown.classList.toggle("open")
    if (lang) {
      props.changeLanguage(lang)
      dropdown.classList.remove("open")
    }
  }

  const rmCLass = () => {
    const dropdown = document.querySelector("#nav-dropdown")
    dropdown.classList.remove("open")
  }

  const text = textContent[props.lang]
  const langs = text.langs
  const lang = langs[props.lang]

  return (
    <div className='lang-selector'>
      <NavDropdown
        title={text.langHeader}
        id="nav-dropdown"
        className="lang-dropdown"
        onClick={e => langSelectHandler(e)}
        onBlur={rmCLass}
      >
        {Object.keys(langs).map(langID => {
          const icon = icons[langID]
          return (
            <NavDropdown.Item data-lang={langID} key={`${langID}_navdrop`}>
              <img src={icon} alt={lang} />
              {langs[langID]}
            </NavDropdown.Item>
          )
        })}
      </NavDropdown>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    lang: state.lang,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeLanguage: lang => dispatch({ type: 'CHANGE_LANGUAGE', lang: lang }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LangButton)
