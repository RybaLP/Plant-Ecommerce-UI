import HeroSection from '../components/heroSection'
import Features from '../components/features'
import ProductGrid from '../components/productGrid'
import NewSeller from '../components/newSeller'
import { useClientInfo } from '../hooks/useClientInfo'
import { useAuthenticationStore } from '../store/authenticationStore'
import { useEffect } from 'react'
import CompanyDescription from '../components/companyDescription'

const LandingPage = () => {

  const {client, isLoading} = useClientInfo();
  const setAuthenticated = useAuthenticationStore(state => state.setAuthenticated);

  useEffect(()=>{
    if (client) {
        setAuthenticated();
    }
  },[client,setAuthenticated]);

  return (
    <>
        <HeroSection/>
        <Features/>
        <ProductGrid/>
        <CompanyDescription/>
        <NewSeller/>
    </>
    )
}

export default LandingPage;