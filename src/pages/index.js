import Axios from '@/Helpers/Axios'
import { Box, Button, Container, Flex, FormControl, FormLabel, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Show, Text, useDisclosure, useToast } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import HomeLayout from '../Layout/HomeLayout'
import GoogleTranslator from '@/GoogleTranslator'
import countries from '@/Helpers/countries'

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [sponsord, setSponsed] = useState()

  const [username, setUsername] = useState(null)

  const toast = useToast()

  useEffect(() => {
    const sponsor = Cookies.get('sponsor')
    if (!sponsor) {
      onOpen()
    } else {
      setSponsed(sponsor)
    }
  }, [])

  const handleVerify = async () => {
    if (!username) {
      return alert('Please enter a username')
    }

    const res = await Axios.get(`/sponsor/validate/${username}`)

    if (!res?.data?.ok) {

      return toast({
        title: 'Sponsor verification failed',
        description: "",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })

    }
    else {
      Cookies.set('sponsor', username)
      toast({
        title: 'Sponsor verified',
        description: "",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })

      setTimeout(() => {
        window.location.href = `/`
      }, 500)
    }
  }

  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [email, setEmail] = useState()
  const [country, setCountry] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const handleSubmit = async () => {

    const sponsor = Cookies.get('sponsor')

    if (!sponsor) {

      toast({
        title: 'Please verify your sponsor!',
        description: "",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })

      return onOpen()
    }

    if(firstName?.length > 10){
      toast({
        title: 'First name must be maximum 10 character',
        description: "",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })

      return
    }

    if(lastName?.length > 10){
      toast({
        title: 'Last name must be maximum 10 character',
        description: "",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })

      return
    }


    if (!firstName || !lastName || !email || !country) {
      return toast({
        title: 'All fields are required!',
        description: "",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }

    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;


    if (!filter.test(email)) {
      return toast({
        title: 'Invalid Email address!',
        description: "",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }


    const res = await Axios.post('/contact', {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phoneNumber,
      sponsorId: sponsor,
      country,
      contactHost: 'go20x'
    })

    if (res?.data?.ok) {
      Cookies.remove('sponsor')

      return window.location.href = `https://shopxcelerate.com/auth/create_credential?token=${res?.data?.token}&email=${res?.data?.email}&uid=${res?.data?.user_id}`

    } else {
      toast({
        title: 'Ops!',
        description: res?.data?.msg,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  return (
    <HomeLayout>
      <div className="main-wrpper">
        {/* <header className="header" style={{ padding: 10 }}>
          <Container maxW={'7xl'}>
            <div style={{ padding: '0 20px' }}>
              <img src="https://xceleratefueltabs.com/landing/images/logo.png" />
              <a href="/login" style={{ float: 'right', padding: 9, background: 'white', textDecoration: 'none', color: 'black', borderRadius: 10, marginTop: 10 }}>Login
                Now</a>
            </div>
          </Container>
        </header> */}
        <Box className="banner-wrapper">
          <Container maxW={'6xl'}>
            {sponsord && <div className="headtitle">
              <h6>Referred by: {sponsord}</h6>
            </div>}
            <div className="row">
              <div className="col-md-5 col-12">
                <Box w={'full'} className="banner-txt">
                  <Text ml={{ base: '5px !important', lg: '0px !important' }} as={'h3'} textAlign={'center !important'} fontSize={{ base: '27px !important', lg: '36px !important' }}>This $20 business changes</Text>
                  <Text as='h1' mt={'-15px !important'} fontSize={{ base: '', lg: '60px !important' }}>EVERYTHING</Text>
                  <Box position={'relative'} mb={{ xl: '-100px' }}>
                    <Box>
                      <h4>A Global Opportunity</h4>
                      <Text as={'h2'} fontSize={{ base: '', xl: '36px !important' }} fontWeight={'bold !important'}>WATCH THIS VIDEO</Text>
                      <p>Network Marketing will never be the same</p>
                    </Box>

                    <Show above='lg'>
                      <Image top={'-120'} right={'-350px'} position={'relative'} src='/images/down-arr.png' />
                    </Show>
                  </Box>
                  <div className="video-bx">
                    <div className="youtube-video">
                      <iframe width="100%" height={620} src="https://www.youtube.com/embed/rebHrLVeurQ?si=tNkTmSByEQqXymLh" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                    </div>
                    <a href="javascript:void(0);" className="play-icon">
                      <i className="far fa-play-circle fa-fw" />
                    </a>
                  </div>
                </Box>
              </div>
              <div className='col-md-2 col-12'></div>
              <div className="col-md-5 col-12">
                <div className="join-frm">
                  <div className="join-block">
                    <Text as={'h2'} fontSize={{ base: '18px !important', xl: '25px !important' }}><span>Easy</span> TO JOIN AND SHARE</Text>
                    <Text as={'h3'} fontSize={{ base: '15px !important', xl: '20px !important' }}>Includes Complete Marketing System</Text>
                    <div className="form-group">
                      <label>First Name:</label>
                      <input onChange={e => setFirstName(e.target.value)} value={firstName} type="text" name placeholder className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Last Name:</label>
                      <input onChange={e => setLastName(e.target.value)} value={lastName} type="text" name placeholder className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Email:</label>
                      <input onChange={e => setEmail(e.target.value)} value={email} type="text" name placeholder className="form-control" />
                    </div>

                    <div className="form-group">
                      <label>Country:</label>
                      <select className="form-control" placeholder={'Select your country'} value={country} onChange={e => setCountry(e.target.value)}>
                        <option value=''>Select Country</option>
                        {countries.map(cntry => {
                          return <option key={cntry} value={cntry}>{cntry}</option>
                        })}
                      </select>
                    </div>

                    <Text as={'h3'} fontSize={{ base: '12px !important', xl: '15px !important' }}>We will send your login credentials to email above</Text>
                    <button onClick={handleSubmit} type="submit">Save My Spot</button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Box>
        {/* <section className="quality-wrp">
          <div className="container">
            <h2>The HIGHEST quality products at the absolute <span>LOWEST</span><br /> prices with the <span>MAXIMUM</span> possible payout!</h2>
            <div className="quality-tabs">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">FUEL TABS</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">FOCUS</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">BIO3X</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="contact-tab2" data-bs-toggle="tab" data-bs-target="#contact2" type="button" role="tab" aria-controls="contact2" aria-selected="false">Magnesium</button>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                  <div className="quality-list">
                    <div className="row">
                      <div className="col-md-4 col-sm-12">
                        <div className="quality-box">
                          <div className="quality-hed">
                            <h3>5 Fuel Tabs<br />$24.00 Retail</h3>
                          </div>
                          <div className="quality-img">
                            <img src="/images/proimg3.png" alt />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-12">
                        <div className="quality-box activebx">
                          <div className="quality-hed">
                            <h3>6 PATENTED Fuel Tabs</h3>
                            <h5>Retail: <span>$24.00 </span></h5>
                            <h5>Members Price: <span>$12.00</span></h5>
                          </div>
                          <div className="quality-img">
                            <img src="/images/proimg1.png" alt />
                          </div>
                          <div className="quality-dt">
                            <p>Over 4 BILLION gallons of fuel treated. The ORIGINAL Fuel Tab. (Tetramethylbenzene Free)</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-12">
                        <div className="quality-box">
                          <div className="quality-hed">
                            <h3>5 Fuel Tabs<br />$24.95 Retail</h3>
                          </div>
                          <div className="quality-img">
                            <img src="/images/proimg2.png" alt />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                  <div className="quality-list">
                    <div className="row">
                      <div className="col-md-4 col-sm-12">
                        <div className="quality-box">
                          <div className="quality-hed">
                            <h3>Alpha Brain<br />$67.47 Retail</h3>
                          </div>
                          <div className="quality-img">
                            <img src="/images/alpha.png" alt />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-12">
                        <div className="quality-box activebx">
                          <div className="quality-hed">
                            <h3>FOCUS - Cognitive Enhancer</h3>
                            <h5>Retail: <span>$59.95 </span></h5>
                            <h5>Members Price: <span>$30.00</span></h5>
                          </div>
                          <div className="quality-img">
                            <img src="/images/focus.png" alt />
                          </div>
                          <div className="quality-dt">
                            <p>Based on the latest Neural Science on Focus, Memory and Neuroprotective Ingredients</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-12">
                        <div className="quality-box">
                          <div className="quality-hed">
                            <h3>Qualia Mind <br />$86.00 Retail</h3>
                          </div>
                          <div className="quality-img">
                            <img src="/images/qualia.png" alt />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                  <div className="quality-list">
                    <div className="row">
                      <div className="col-md-4 col-sm-12">
                        <div className="quality-box">
                          <div className="quality-hed">
                            <h3>Primal Gut Health <br />$47.95 Retail</h3>
                          </div>
                          <div className="quality-img">
                            <img src="/images/primal.png" alt />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-12">
                        <div className="quality-box activebx">
                          <div className="quality-hed">
                            <h3>Bio3X Ultimate Gut Support</h3>
                            <h5>Retail: <span>$40.00 </span></h5>
                            <h5>Members Price: <span>$20.00</span></h5>
                          </div>
                          <div className="quality-img">
                            <img src="/images/3x.png" alt />
                          </div>
                          <div className="quality-dt">
                            <p>The most advanced gut health formula on the market. Contains ZERO live bacteria </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-12">
                        <div className="quality-box">
                          <div className="quality-hed">
                            <h3>Seed SynBiotic <br />$49.95 Retail</h3>
                          </div>
                          <div className="quality-img">
                            <img src="/images/seed.png" alt />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="contact2" role="tabpanel" aria-labelledby="contact-tab2">
                  <div className="quality-list">
                    <div className="row">
                      <div className="col-md-4 col-sm-12">
                        <div className="quality-box">
                          <div className="quality-hed">
                            <h3>Only Magnesium<br />$17.95 Retail</h3>
                          </div>
                          <div className="quality-img">
                            <img src="/images/live.png" alt />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-12">
                        <div className="quality-box activebx">
                          <div className="quality-hed">
                            <h3>Magnesium PLUS<br />Zinc, D3 and B6</h3>
                            <h5>Retail: <span>$16.95 </span></h5>
                            <h5>Members Price: <span>$10.00</span></h5>
                          </div>
                          <div className="quality-img">
                            <img src="/images/mag.png" alt />
                          </div>
                          <div className="quality-dt">
                            <p>Our Magnesium includes Zinc, D3 and B6 and is the most bioavailable form of Magnesium available</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-12">
                        <div className="quality-box">
                          <div className="quality-hed">
                            <h3>Only Magnesium<br />$19.95 Retail</h3>
                          </div>
                          <div className="quality-img">
                            <img src="/images/comag.png" alt />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        <Box py={24} className="money-back-wrp">
          <Container maxW={'6xl'} className="">
            <Box mb={{ base: 10, xl: 28 }} fontSize={'50px'}>
              <Text as={'h2'} fontSize={{ base: '15px !important', xl: '39px !important' }} lineHeight={{ base: '22px !important', xl: '55px !important' }}>Our Matrix automatically places everyone that joins <span>AFTER</span> you <span>BELOW</span> you to <span>MAXIMIZE</span> earnings</Text>
            </Box>
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <Box ml={{ base: 10, lg: 0 }} className="money-data">
                  <h3>No Ridiculous Qualifiers</h3>
                  <ul>
                    {/* <li>Up to $3,279.00 per month. No sponsoring </li> */}
                    <li>80% Fast Start Bonus</li>
                    <li>100% Retail Commissions</li>
                    <li>15% Wholesale Commissions</li>
                    <li>50% Check Match Bonus</li>
                    <li>Over 80% Total Payout</li>
                  </ul>
                </Box>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="money-back-img">
                  <img src="https://webexe.s3.ap-southeast-1.amazonaws.com/complogo2.png" alt />
                </div>
              </div>
            </div>
          </Container>
        </Box>

        <div className="benefits">
          <Container className="container" maxW={'7xl'}>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-6">
                <div className="row">
                  <div className="col-sm-12 col-md-6 col-lg-12">
                    <div className="benefit-left">
                      <h2>You Could Earn:</h2>
                      <div className="benefit-list">
                        <div className="b-label">
                          BENEFITS
                        </div>
                        <div className="b-block">
                          <div className="icon">
                            <img src="/asset3/images/icon1.png" alt="icon" width={37} className="img-fluid" />
                          </div>
                          <h3>Unlimited Commission</h3>
                        </div>
                        <div className="b-block">
                          <div className="icon">
                            <img src="/asset3/images/icon2.png" alt="icon" width={36} className="img-fluid" />
                          </div>
                          <h3>Bonuses and Free Product</h3>
                        </div>
                        <div className="b-block">
                          <div className="icon">
                            <img src="/asset3/images/icon3.png" alt="icon" width={34} className="img-fluid" />
                          </div>
                          <h3>Daily and Weekly Deposits</h3>
                        </div>
                        <div className="b-block">
                          <div className="icon">
                            <img src="/asset3/images/icon4.png" alt="icon" width={23} className="img-fluid" />
                          </div>
                          <h3>Free Cruises and Vacations</h3>
                        </div>
                        <div className="b-block">
                          <div className="icon">
                            <img src="/icon5.png" alt="icon" width={38} className="img-fluid" />
                          </div>
                          <h3>Monthly Passive Income</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-6 col-lg-12">
                    <div className="benefit-left">
                      <div className="get-list">
                        <h2>What you get:</h2>
                        <ul>
                          <li>Free training and support</li>
                          <li>Free e-commerce website</li>
                          <li>Free Landing pages and marketing system</li>
                          <li>Free backoffice and management tools</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6">
                <div className="benefit-image">
                  <img src="https://webexe.s3.ap-southeast-1.amazonaws.com/benefit.png" alt="benefit" className="img-fluid" />
                  <div className="bg-img">
                    <img src="/asset3/images/img-b.png" alt="benefit" className="img-fluid" />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <footer>
          <div className="container">
            <h6>Training by million dollar producers. Marketing systems that do the heavy lifting. E-commerce platform that automatically sets up your FREE commission  generating online store.</h6>
          </div>
        </footer>
      </div>


      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader borderBottom={'1px'} borderColor='gray.300'>
            Who referred you?
          </ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody>

            <FormControl isRequired>
              <FormLabel>Sponsor username</FormLabel>
              <Input value={username} onChange={e => setUsername(e.target.value)} placeholder='Enter sponsor username' />
            </FormControl>

          </ModalBody>

          <ModalFooter borderTop={'1px'} borderColor='gray.300' as={'sponsor'}>
            <Button onClick={handleVerify} colorScheme='blue'>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box position={'fixed'} top={{ xl: 1 }} bottom={{ base: 1 }} left={{ xl: 1 }} right={{ base: 1 }} w={'150px'} zIndex={50}>
        <GoogleTranslator />
      </Box>
    </HomeLayout>
  )
}
