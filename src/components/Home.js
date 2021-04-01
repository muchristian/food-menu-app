import React, {useState, useEffect} from 'react';
import firebs, {storage} from '../firebase';
import Pagination from './Pagination';
import paginate from '../Utils/paginate';
import Tabs from './Tabs';
import categories from '../category.json';

function Home() {
    const [menuList, setMenuList] = useState();
  const [imageList, setImage] = useState([]);
  const [categoryList, setCategory] = useState([{_id: 0, name: 'All'}, ...categories.categories]);
  const [selCategory, setSelCategory] = useState({_id: 0, name: 'All'})
  const [pageSize, setPage] = useState(4);
  let [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true)
  const images = storage.ref().child('images/');
  const filtered = 
  selCategory && selCategory._id !== 0 ? menuList.filter(m => m.category === selCategory.name) : menuList; 
  const list = paginate(filtered, currentPage, pageSize);
  useEffect(() => {
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
  setTimeout(() => {setLoading(false)}, 3000)
  
    const menuRef = firebs.database().ref('Menu');
    menuRef.on('value', (snapshot) => {
      const menus = snapshot.val();
      const menuList = [];
      for (let id in menus) {
        menuList.push({ id, ...menus[id] });
      }
      setMenuList(menuList);
    });
  }, []);

  const getImage = (image) => {
    return imageList.filter(e => e.img === image)
  }
  const handlePageChange = page => {
    setCurrentPage(page);
  }
  const handleFilter = (selected) => {
    setSelCategory(selected);
    setCurrentPage(1);
  }
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
  if (loading) {
    return (
        <div id="preloader">
          <div id="status">
              <div className="spinner"></div>
          </div>
      </div>
      )
  }
    return (
        <div class="home-container">
            <div class="container" style={{height: '100vh'}}>
            <div class="row">
		   <div class="col-xl-12">
			  <div class="section-title text-center mb-60">
				 <p>Famous for good food</p>
				 <h4>our menu</h4>
			  </div>
		   </div>
		</div>
		<div class="row mt-2 mb-4">
    <ul class="nav nav-pills" id="menu-tabs">
      <Tabs
      categories={categoryList}
      selectedItem={selCategory}
      itemSelect={handleFilter}
      />
</ul>
		</div>
    <div class="row">
        <div class="col-12 mt-3">
            <div class="row">
            {list
        ? list.map((menu, index) => (
                <div class="col-md-6 mb-3" key={menu.id}>
            <div class="card menu-item px-4 py-2">
                <div class="card-horizontal">
                    <div class="img-square-wrapper">
                    {getImage(menu.image)[0] ? <img src={getImage(menu.image)[0].url} alt="none"/> : ' '}
                    </div>
                    <div class="card-body">
                        <h4 class="card-title">{menu.name} <span>{menu.price} Rfw</span></h4>
                        <p class="card-text">{menu.category}</p>
                    </div>
                </div>
                
            </div>
            </div>
        )) : ''}
            </div>
        </div>
        <div class="col-sm-12 col-md-12 col-lg-12 mt-4">
<Pagination 
dataLength={filtered &&  filtered.length} 
prevPage={prevPage}
nextPage={nextPage}
currPage = {currentPage}
pageSize={pageSize}
onPageChange={handlePageChange}/>
    </div>
    </div>
    </div>
    </div>
    )
}

export default Home;
