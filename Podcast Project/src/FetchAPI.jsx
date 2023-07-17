export default function FetchApi(){

    const apiGet = () => {
      fetch('https://podcast-api.netlify.app/shows')
      .then((response) => response.json())
      .then((json)=> console.log(json))
    }

    return(
        <div>
           <button onClick={apiGet}> Click to start</button> 
        </div>
    )
  }