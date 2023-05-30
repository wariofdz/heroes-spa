import { Route, Routes } from 'react-router-dom';

import { HeroesRoutes } from '../heroes';
import { LoginPage } from '../auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
  return (
    <>      
      <Routes>

          {/*<Route path="login" element={<LoginPage />} />*/}
          
          <Route path="login" element={
            <PublicRoute>
              <LoginPage />
              {/* 
                  Tambien podemos hacerlo de la siguiente manera:
                   <Route path="login/*" element={
                     <PublicRoute>
                        <Routes>
                           <Route path="/*" element={<LoginPage />} />
                        </Routes>
                     </PublicRoute>
                   } />
               */}
            </PublicRoute>
          } />


          {/* provocamos que pasen todos por aqui */}
          
          <Route path="/*" element={
          /* PrivateRoute es nuestro higher order component y dentro colocamos la ruta hija que tenemos nuestra web.
             Hemos creado un nuevo componente. */
            <PrivateRoute>
              <HeroesRoutes />
            </PrivateRoute>
          } />
          {/*<Route path="/*" element={<HeroesRoutes />} />*/}
      </Routes>
    </>
  )
}
