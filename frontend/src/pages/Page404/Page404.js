import React from 'react'
import { Link } from 'react-router-dom'
import "./notfound.css"
const Page404 = () => {
  return (
    <div id="notfound">
<div class="notfound">
<div class="notfound-404">
<h3>Oops! Page not found</h3>
<h1><span>4</span><span>0</span><span>4</span></h1>
</div>
<h2>we are sorry, but the page you requested was not found</h2>
<div>Go to <Link to="/" ><a className="text-primary"> Home</a></Link></div>
</div>
</div>
  )
}

export default Page404