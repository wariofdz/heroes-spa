import { HeroList } from '../components';

export const DcPage = () => {
    return (
      <div className="container mt-2">
          <h1>DC Comics</h1>
          <hr />  

          <HeroList publisher={'DC Comics'}/>

      </div>
  
    )
      
  }
  