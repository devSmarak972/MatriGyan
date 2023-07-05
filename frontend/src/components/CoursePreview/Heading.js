import React from "react";
import { Link } from "react-router-dom";

function Heading() {
  return (
    <div className="page-section bg-alt border-bottom-2">
      <div className="container page__container">
        <div className="d-flex flex-column flex-lg-row align-items-center">
          <div className="d-flex flex-column flex-md-row align-items-center flex mb-16pt mb-lg-0 text-center text-md-left">
            <div className="avatar mb-16pt mb-md-0 mr-md-16pt">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAZlBMVEUAAAD///8BAQHZ2dk6OjqsrKxvb29ISEjm5uZra2vc3NxFRUX5+fnr6+soKCjGxsYQEBCEhISysrI/Pz+ZmZm8vLwaGhqlpaXw8PBiYmIiIiJdXV2Ojo5nZ2dPT099fX0zMzPExMRa7XZ/AAAE5UlEQVR4nO2c53ajMBCFZdzjgmtwyTrZ93/JBdnexEKUGcRIyrnfyS+CykUNjS5WCgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABEjc/TFK6V+eW2zKmhP1KtRt5mZuNskC1TCyHrijlHlR8c30ut0Nl/YUs+PHn9tFd6U4FCYvORe13h+Oq4ZUp7/Z7TFcYlJ4r+1o2CTvziqd3isTj0LdHvM3QlqtsQ+JvSjUHW4xpiU+7XTPjkLhvQFP5OTppQ+J/ShU7xkn/fKzh0nVvcKijuuUmcPWfSs6V6jbgN5Df0oMX+GaL3Aw+Gz/IuRHYTEGuV1Us7w4XjR6UMiaZL5JlVuJjhXmAuddc9kFrVCpRZdBqDlNnQ5F53sL4puMjdSxwnosGmpzs/bRWTqpSLBIZ5b7nTZiUr8HLyms36snyvKyPcvW95KsEYGvQ3nr6LYR6+IuVoXV9+f/G5UFjkfq8apqyb+4fC09ldVNJoSjLKO0tuD8f0Ozssv54z8VSfQDO5qpsjAV5rXdmxve5aQpQqElmq2Y7zKEoClU6mA2xlw1t0b+AK7GWDzdXKqoLZzUS9XG7G5j1aq7JaVH8yfIXqrU1Oiks1GrSTG/5ctYND6CVJios3F32wkjfwzG2/oxUIVbownX7RUujKSBKty93py2nvMT8+VpGahCYzWctK5mSWHDgHcHUaEx5xOWbeKU5g6iQvPm36+wfS0tT0cGQYXNV3pBrpcamzjXAbfqgqVmGiV/+v0slaSQvVr4Q2rF94fQW5tHhN68PSKze/KJ0A7YIyJRDK8IRKI803s00TtEhdSIcAAQZxpqVF/At9cEdbtAPpm5p/I4UBkbIsLp2nK4216nG6U8rpr0NiSfkK6Oh/3z/MID5DZknXKvhqNHWnkYCnlOhbe5p+FIH4dst8l4ofpymNbWlz7T5JW8tDOVGpy8NCNLYX4LS+Ige5cfi5zwWSHxwrNFFfZLYY28ACHbfTlYiXdUrsKE5aAtJF6EOyozyMtyQd9JhcciO4ydkJ3sT7JIFBK/RvjJXFRit6OIll+UGJwWwca8LcmLuzfTc/VXQTbGPYmxV7HjsV5Df5tYfXtFP+1SaRLdDy519KJic5+zziwa3wRHosOjWUucRusYWRYVwUBy34fPOrd5aYwO5eaa3o/XdTtOTImrfZgnpNwiVDkscAjzlJtdRjl8ddw4L6ay9P4V6kCyMaOupu6LqShcxOaS52luts6/qZdqhWujEd1/4FVZtoTCIlMjKLD7ZQrzXCev5QxDVcg9WkoicV/yfU0lhaE695qvOCnIJcSC+bWMQ2EH5140vZTt3Itlpuni845iteA792JZ8dnOvWje2tjOvYjevHnOvZh2TyznXkQ74ITl3IspisFx7kUWiUrIzr3YoolU516EEWGac6+4GF1Un+jci/NkpvvvYgR9upY4+G2TwE9IHfw+TeCn3Fzn3jeZrKNG0Ln3IAK3Cdu5p4nBMdTBuReL6wvOvWpicV8qpnMvGgetTsZw7sXjgn4kJDr3InKy/0+pb2zn3Ivqa4SXtK2ce56/KOl4nNDg3Cu+Cjp7/yqo+Upt+rYTEylXl3T/MYca595zp+/7E1PuwXVDPh1zAwAAAAAAAAAAAAAAAABAJPwDr0U3F7ZB5fEAAAAASUVORK5CYII="
                //added sample image
                className="avatar-img rounded"
                alt="lesson"
              />
            </div>
            <div className="flex text-left" style={{flexDirection:"column"}}> 
              <h1 className="h2 m-0">Introduction to TypeScript</h1>
              <div className="rating mb-8pt d-inline-flex">
                <div className="rating__item">
                  <i className="material-icons">star</i>
                </div>
                <div className="rating__item">
                  <i className="material-icons">star</i>
                </div>
                <div className="rating__item">
                  <i className="material-icons">star</i>
                </div>
                <div className="rating__item">
                  <i className="material-icons">star</i>
                </div>
                <div className="rating__item">
                  <i className="material-icons">star_border</i>
                </div>
              </div>
            </div>
          </div>
          <div className="ml-lg-16pt">
            <Link to="/" className="btn btn-light">
              Library
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Heading;
