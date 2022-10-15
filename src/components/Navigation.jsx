import React, { useContext, useEffect, useState } from 'react'
import styles from './components-styles/Navigation.module.css'
import { FaPlus } from 'react-icons/fa'
import '../index.module.css';
import DataService from '../services/data.service';
import { NavLink, Outlet, useLocation, useSearchParams } from 'react-router-dom';
import AppContext from '../Contexts/AppContext';
import AppActions from '../Actions/AppActions';
import ProjectSaveModal from '../modal/ProjectSaveModal';

export default function Navigation() {
  const [projectName, setProjectName] = useSearchParams();
  const location = useLocation();
  const [state, dispatch] = useContext(AppContext);
  const [isAddProject, setAddProject] = useState(false);

  useEffect(() => {
    DataService.getProjects().then((res) => {
      dispatch(AppActions.setProjects(res))
    })
    DataService.getTasks().then(value => {
      dispatch(AppActions.setAllTasks(value))
    })

  }, [])

  const handleInputChange = (event) => {
    let filter = event.target.value;
    if (filter) {
      setProjectName({ filter })
    } else {
      setProjectName({})
    }
  }

  const handleProjectClick = () => {
    setAddProject(prev => !prev);
  }

  const handleSaveProjectClick = (projectName, projectDescription) => {
    DataService.addProject(projectName, projectDescription).then(value => {
      dispatch(AppActions.addProject(value))
    })
    console.log("Project Saved");
    setAddProject(prev => !prev)
  }

  return (
    <div className={`${styles.layout__holder} ${styles.display}`}>
      <div className={`${styles.navigation} ${styles.holder}`}>
        <div className={styles.search}>
          <input className={styles.navigation__input}
            type="text"
            placeholder='Search Project...'
            value={projectName.get("filter") || ""}
            onChange={handleInputChange}
          />
          <div className={styles.add} onClick={handleProjectClick}>
            <FaPlus className='plus icon-style' />
          </div>
          <ProjectSaveModal save={handleSaveProjectClick} click={handleProjectClick} isActive={isAddProject} />
        </div>
        {state.projects.length !== 0 ?
          state.projects.filter(project => {
            let filter = projectName.get("filter");
            if (!filter) return true;
            let name = project.projectName.toLowerCase();
            return name.includes(filter.toLowerCase());
          }).map((project) => (
            <NavLink to={`/todolist/${project.projectId}${location.search}`}
              className={
                ({ isActive }) => {
                  return `${styles.project} ${isActive ? styles.active : ""}`
                }
              }
              key={project.projectId}
            >
              {project.projectName}
            </NavLink>
          )) :
          <div className={styles.no__project}>
            <h3 style={{ margin: "0" }}>
              No Projects available
            </h3>
            <p>Click <a style={{ color: "#f16249", cursor: "pointer", textDecoration: "underline" }}
              onClick={handleProjectClick}
              alt="Add Task"
            >here
            </a>
            </p>
          </div>
        }
      </div>
      <Outlet />
    </div>
  )
}
