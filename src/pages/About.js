import Base from "../components/Base";

function About(){


    return(
       <Base
              title="About Page"
              description={"Welcome to About Page"}
              buttonEnabled={true}
              buttonType="success"
              buttonLink="/" 
       >

            <h1>This is About Page</h1>
            

       </Base>      
    )
}

export default About;