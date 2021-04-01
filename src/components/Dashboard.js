import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import CreateMenu from './CreateMenu';
import { Link, useHistory, Route } from 'react-router-dom';
import Modal from './Modal';
import firebs, {storage} from '../firebase';
import Form from 'react-bootstrap/Form'
import {useAuth} from '../contexts/AuthContext';
import { auth } from '../firebase';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import paginate from '../Utils/paginate';

function Dashboard(props) {
  const history = useHistory();
  console.log(history)
  const [menuList, setMenuList] = useState();
  const [imageList, setImage] = useState([]);
  const [pageSize, setPage] = useState(4);
  let [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('')
  const {logout} = useAuth();
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true)
  const images = storage.ref().child('images/');
  let regexp = /jpg|png|jpeg?/gi;
  console.log(search)
  let filtered = search ? menuList.filter(m => m.name.toLowerCase().indexOf(search.toLowerCase()) !== -1) : menuList;
  const list = paginate(filtered, currentPage, pageSize);
  

  async function handleLogout() {
    try {
      await logout()
      history.push('/login'); 
    } catch {
      console.log('logout error')
    }
  }

  // function displayImage(img) {
  // const image = images.child(img);
  // return image.getDownloadURL()
  // }

  useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
          setCurrentUser(user)
          setLoading(false);
      })

      
    let arr = []
    // let unmounted = false
    
    images.listAll().then( res => {
      res.items.forEach( itemRef => {
        // i++;
        itemRef.getDownloadURL().then((url) => {
          // const d = name.replace(regexp, '')
          // const property = d
          const obj = {
            img: itemRef.name,
            url: url
          }
          console.log(itemRef.name)
          console.log(url)
          console.log(obj)
          arr.push(obj)
            setImage([...arr])

        })
      });
  })
  
    const menuRef = firebs.database().ref('Menu');
    menuRef.on('value', (snapshot) => {
      const menus = snapshot.val();
      const menuList = [];
      for (let id in menus) {
        menuList.push({ id, ...menus[id] });
      }
      setMenuList(menuList);
    });
    // return unsubscribe
  }, []);
  // function displayImage(images, name) {
  //   // const d = name;
  //   images.getDownloadURL().then((url) => {
  //     const d = name.replace(regexp, '')
  //     const property = d
  //     const obj = {
  //       img: name,
  //       url: url
  //     }
  //     console.log(name)
  //     console.log(url)
  //     const arr = []
  //     arr.push(obj)
  //     setImage([...arr])
  //   }, name)
  // }
  const handleChange = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }
  
  const deleteMenu = (id) => {
    const menuRef = firebs.database().ref('Menu').child(id);
    menuRef.remove();
  };
  // const getImage = (image) => images.child(`images/${image}`).getDownloadURL().then((url) => {
  //     return url
  //   }).catch((error) => {
  //     // Handle any errors
  //     return error
  //   })
  //   const printAddress = (image) => {
  //     let val;
  //     getImage(image).then((a) => {
  //       // console.log(a);
  //       return <p>a</p>
  //     });
  //   };
  const getImage = (image) => {
    return imageList.filter(e => e.img === image)
  }
  const handlePageChange = page => {
    setCurrentPage(page);
  }
  // const prevChange = () => {
  //   setCurrentPage(currentUser)
  // }
  console.log(getImage('0febf096caf9ac38295337b19d0023d9.jpg'))

  const prevPage = () => {
    if (currentPage > 1) {
      currentPage--;
      setCurrentPage(currentPage)
    }
  }

  const nextPage = (pageLength) => {
    if (currentPage < pageLength) {
      currentPage++;
      setCurrentPage(currentPage)
    }
  }
  console.log(imageList)
  if (loading) {
    return (
      <div id="preloader">
        <div id="status">
            <div className="spinner"></div>
        </div>
    </div>
    )
  }
  let tableBD;
                if(!list) 
                {
                tableBD = (
                <tr>
                            <td colSpan="6" className="text-center">Loading...</td>
                        </tr>
                        )
                } else {
                tableBD = (
            <>
                {list && list.map((menu) => {
                    return (
                        <tr key={menu.id}>
                            <td className="d-flex">{getImage(menu.image)[0] ? <img src={getImage(menu.image)[0].url} alt="none"/> : 
                            <div className="spinner-border align-self-center" role="status">
  <span className="sr-only">Loading...</span>
</div>}</td>
                            <td>
                            <h6>{menu.name}</h6>
                            </td>
                            <td><span className="badge p-2">{menu.price} Rfw</span></td>
                            <td>
                            <p className="text-muted" style={{fontSize:12}}>{menu.category}</p>
                            </td>
                            <td>
                            <ul className="mt-3">
                    <li className="mr-3" style={{listStyle:'none', display: 'inline-block'}}>
                      <button className="btn btn-danger py-1 px-2" onClick={() => deleteMenu(menu.id)}>Delete</button></li>
                    <li style={{listStyle:'none', display: 'inline-block'}}>
                    <Link 
          to={{ pathname: history.location.pathname, search: `?update=true&&id=${menu.id}` }} className="btn btn-primary py-1 px-2">
                  Edit
          </Link>
                      </li>
                    </ul>
                            </td>
                        </tr>
                    )
                })}
            </>
        )
            }
    return (
      <>
        <div className="row justify-content-center mt-4 mr-0 ml-0" id="menu">
        <div className="col-sm-12 col-md-8 col-lg-8 mt-3 mb-4 d-flex justify-content-between align-item-center">
      <p>{currentUser.email}</p>
      <Button onClick={handleLogout}>logout</Button>
      </div>
      <div className="card m-b-30 col-sm-12 col-md-8 col-lg-8">
                                <div className="card-body">
                                  <div className="d-flex justify-content-between align-items-center">
                                  <SearchBar value={search} change={handleChange} />
          <Link 
          to={{ pathname: history.location.pathname, search: "?create=true" }} 
          className="btn btn-primary px-2" style={{ marginTop: '-22px', backgroundColor:'#ff5e18', outline: 'none', boxShadow: 0, border: '1px solid #ff5e18'}}>Create Menu</Link>  
                                  </div> 
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="table-responsive">
                                                <table className="table table-hover m-b-0">
                                                    <thead>
                                                        <tr>
                                                            <th>Pic</th>
                                                            <th>Name</th>
                                                            <th>Price</th>
                                                            <th>Category</th>
                                                            <th>actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {tableBD}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>              
                                </div>
                            </div>
        <div className="col-sm-12 col-md-8 col-lg-8 mt-4">
<Pagination 
dataLength={menuList &&  menuList.length} 
prevPage={prevPage}
nextPage={nextPage}
currPage = {currentPage}
pageSize={pageSize}
onPageChange={handlePageChange}/>
    </div>
</div>
<Route 
            path={`${history.location.pathname}`} 
            render={() => {
                let params = new URLSearchParams(history.location.search);
              return (
                params.get("create") || params.get('update') ?
                <Modal
            click={() => {
                history.push(history.location.pathname);
              }}
              title={params.get("update") ? "Update Menu" : "Create Menu"}
              data={params.get("update") ? menuList : ''}
              isOpen={params.get("create") || params.get("update")}
            >
                <CreateMenu/>
              </Modal> : ''
              );
            }}/>
            </>
    );
}

export default Dashboard;