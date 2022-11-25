import React from 'react'
import styles from './PreLoader.module.css'

function PreLoader({children}) {

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {

   setTimeout(() => {
    setLoading(false);
   }, 900);
  

  }, []);

  return (
    <>
      {
        loading && (
          <div className={styles.loading_container}>
          <h1 className={styles.logo}>FreshYemek</h1>
        </div>)
      }
      {
        !loading && children
      }
    </>
  )


}

export default PreLoader