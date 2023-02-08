import React,{useEffect, useState} from 'react'
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux'
import './Header.css'
import { Link,useNavigate,useLocation } from 'react-router-dom'
import { logout } from '../../actions/userActions'
function Header() {
  const [keyword, setKeyword] = useState('')
  let navigate = useNavigate()
  const location = useLocation()

  const [t,i18n]=useTranslation()
  const cart = useSelector(state => state.cart)
  
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()

  const logoutHandler = () => {
      dispatch(logout())
  }

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      submitHandler()
    }
  };
  const submitHandler = () => {
      if (keyword) {
        navigate(`/?keyword=${keyword}&page=1`)
      } else {
        navigate(navigate(location.pathname))
      }
  }
  useEffect(()=>{
    if(keyword === ''){
      submitHandler()
    }
  },[keyword])
  return (
    <header>
      <div className='header-info'>
        <div className='header-info-container container'>
          <div className='header-info-personal'>
            <a href='mailto:saadelweshahy@gmail.com' target="_blank"><i className="fa-solid fa-envelope"></i> saadelweshahy@gmail.com</a>
            <span></span>
            <a href='tel:+201023096900' target="_blank"><i className="fa-solid fa-phone-volume"></i> +20 1023096900</a>
          </div>
          <div className='header-info-ln'>
            {/* change to english */}
            {i18n.language == 'ar' &&
                <button
                  onClick={()=>{
                    i18n.changeLanguage('en')
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M256 32C132.288 32 32 132.288 32 256C32 379.712 132.288 480 256 480C379.712 480 480 379.712 480 256C480 132.288 379.712 32 256 32Z" fill="#E92B2B"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M450.034 368H61.9688C74.1621 389.079 89.6917 407.986 107.835 424H404.168C422.311 407.986 437.841 389.079 450.034 368Z" fill="#FBFBFB"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M480 256H32C32 275.337 34.4502 294.101 39.057 312H472.943C477.55 294.101 480 275.337 480 256Z" fill="#FBFBFB"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M450.038 144H61.9727C51.9465 161.332 44.176 180.133 39.0625 200H472.949C467.835 180.133 460.065 161.332 450.038 144Z" fill="#FBFBFB"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M404.145 88H107.812C147.3 53.1476 199.17 32 255.979 32C312.788 32 364.657 53.1476 404.145 88Z" fill="#FBFBFB"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M233.606 33.1055V256H32C32 139.846 120.409 44.3412 233.606 33.1055Z" fill="#2A2FAF"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M66.1579 137.078H75.72L62.5536 146.644L67.5828 162.122L56.5 154.07C59.4771 148.254 62.701 142.586 66.1579 137.078Z" fill="#FBFBFB"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M37.3125 207.332C37.5389 206.31 37.7722 205.291 38.0125 204.275H49.379L54.4081 188.797L59.4373 204.275H75.7118L62.5454 213.841L67.5745 229.319L54.4081 219.753L41.2418 229.319L46.2709 213.841L37.3125 207.332Z" fill="#FBFBFB"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M111.795 84.5865C118.024 79.3401 124.544 74.4271 131.326 69.875H142.908L129.741 79.4409L134.77 94.919L121.604 85.353L108.438 94.919L111.795 84.5865Z" fill="#FBFBFB"/>
    <path d="M121.616 121.602L126.645 137.08H142.92L129.753 146.646L134.783 162.124L121.616 152.558L108.45 162.124L113.479 146.646L100.312 137.08H116.587L121.616 121.602Z" fill="#FBFBFB"/>
    <path d="M121.616 188.797L126.645 204.275H142.92L129.753 213.841L134.783 229.319L121.616 219.753L108.45 229.319L113.479 213.841L100.312 204.275H116.587L121.616 188.797Z" fill="#FBFBFB"/>
    <path d="M188.804 54.3984L193.833 69.8765H210.107L196.941 79.4424L201.97 94.9204L188.804 85.3545L175.637 94.9204L180.666 79.4424L167.5 69.8765H183.775L188.804 54.3984Z" fill="#FBFBFB"/>
    <path d="M188.804 121.602L193.833 137.08H210.107L196.941 146.646L201.97 162.124L188.804 152.558L175.637 162.124L180.666 146.646L167.5 137.08H183.775L188.804 121.602Z" fill="#FBFBFB"/>
    <path d="M188.804 188.797L193.833 204.275H210.107L196.941 213.841L201.97 229.319L188.804 219.753L175.637 229.319L180.666 213.841L167.5 204.275H183.775L188.804 188.797Z" fill="#FBFBFB"/>
                  </svg> 
                  english
                </button>
            }    
            {/* change to arabic */}
            {i18n.language == 'en' &&
                <button
                  onClick={()=>{
                    i18n.changeLanguage('ar')
                  }}
                ><svg width="20" height="20" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M256 32C379.712 32 480 132.288 480 256C480 379.712 379.712 480 256 480C132.288 480 32 379.712 32 256C32 132.288 132.288 32 256 32Z" fill="#FBFBFB"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M468.168 184H43.8125C73.7974 95.6088 157.465 32 255.99 32C354.515 32 438.183 95.6088 468.168 184Z" fill="#32AB45"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M468.168 328C438.183 416.391 354.515 480 255.99 480C157.465 480 73.7974 416.391 43.8125 328H468.168Z" fill="#1D1D1D"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M152 57.5547V454.445C80.6592 416.98 32 342.172 32 256C32 169.827 80.6592 95.0196 152 57.5547Z" fill="#E92B2B"/>
                      </svg>
                  عربي
                </button>
            }    
          </div>
        </div>
      </div>
      <div className='header-nav'>
        <div className='container'>
          <div className='header-nav-container' style={i18n.language == 'ar'?{flexDirection:'row-reverse'}:{flexDirection:'row'}}>
            <div className='header-nav-logo'>
              <h1><Link to="/"><img src='/static/images/logo.png' /></Link></h1>
            </div>
            <div className='header-nav-search' style={i18n.language == 'ar'?{flexDirection:'row-reverse'}:{flexDirection:'row'}}>
              <input type="search" onChange={(e) => setKeyword(e.target.value)} onKeyDown={handleKeyDown} placeholder={i18n.language == 'ar'?'بحث':'Search'} style={i18n.language == 'ar'?{direction:'rtl'}:{direction:'ltr'}}/>
              <button onClick={submitHandler}><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>
            <div className='header-nav-icons' style={i18n.language == 'ar'?{flexDirection:'row-reverse'}:{flexDirection:'row'}}>
              <Link to="/cart" className='header-nav-icons-cart'>
                <i className="fa-solid fa-cart-shopping"></i>
                <span>{cart.cartItems.length}</span>
              </Link>
              <Link className='header-nav-icons-user'>
                <i className="fa-solid fa-user"></i>
                <div className='header-nav-icons-user-list' style={i18n.language == 'ar'?{right:'-150px',direction:'rtl'}:{right: '0px',direction:'ltr'}}>                
                    {userInfo ?
                    <ul> 
                      <li><Link to="/profile">{i18n.language == 'ar'?'الصفحه الشخصيه':'Profile'}</Link></li>
                      <li><Link to="/cart">{i18n.language == 'ar'?'عربه التسوق':'Shopping Cart'}</Link></li>
                      <li><Link onClick={logoutHandler}>{i18n.language == 'ar'?'خروج':'Logout'}</Link></li>                    
                    </ul>
                    :
                    <ul>                   
                      <li><Link to="/login">{i18n.language == 'ar'?'تسجيل الدخول':'SignIn'}</Link></li>
                      <li><Link to="/register">{i18n.language == 'ar'?'إنشاء حساب':'SignUp'}</Link></li>
                    </ul>
                    }
                </div>
              </Link>
              {userInfo && userInfo.isAdmin && (
              <Link className='header-nav-icons-user'>
              <i className="fa-solid fa-screwdriver-wrench"></i>
              <div className='header-nav-icons-user-list' style={i18n.language == 'ar'?{right:'-150px',direction:'rtl'}:{right: '0px',direction:'ltr'}}>                
                  <ul> 
                    <li><Link to="/admin/userlist">{i18n.language == 'ar'?'قائمه المستخدمين':'Users List'}</Link></li>
                    <li><Link to="/admin/productlist">{i18n.language == 'ar'?'قائمه المنتجات':'Products List'}</Link></li>
                    <li><Link to="/admin/orderlist">{i18n.language == 'ar'?'قائمه الطلبيات':'Orders List'}</Link></li>                    
                  </ul>
              </div>
            </Link>

              )}

            </div>
          </div>
        </div>
        <div className='container'>
            <div className='header-nav-search mobile' style={i18n.language == 'ar'?{flexDirection:'row-reverse'}:{flexDirection:'row'}}>
              <input type="search" onChange={(e) => setKeyword(e.target.value)} onKeyDown={handleKeyDown} placeholder={i18n.language == 'ar'?'بحث':'Search'} style={i18n.language == 'ar'?{direction:'rtl'}:{direction:'ltr'}}/>
              <button onClick={submitHandler}><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>
        </div>
      </div>
    </header>
  )
}

export default Header
