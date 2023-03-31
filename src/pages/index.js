import Axios from '@/Helpers/Axios'
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import HomeLayout from './Layout/HomeLayout'

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [sponsord, setSponsed] = useState()

  const [username, setUsername] = useState(null)
  const toast = useToast()

  useEffect(() => {
    const sponsor = Cookies.get('sponsor')
    if (!sponsor) {
      onOpen()
    }else{
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
  const [phoneNumber, setPhoneNumber] = useState()

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

    if (!firstName && !lastName && !email && !phoneNumber) {
      return toast({
        title: 'All fields are required!',
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
      contactHost: 'go20x'
    })

    if (res?.data?.ok) {
      Cookies.remove('sponsor')
      window.location.href = `https://shopxcelerate.com/${sponsor}`
    } else {
      toast({
        title: 'Oopss!',
        description: res?.data?.msg,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })

      Cookies.remove('sponsor')

      setTimeout(() => {
        window.location.href = `/`
      }, 500)

    }

  }

  return (
    <HomeLayout>
      <div className="main-wrpper">
        <section className="banner-wrapper">
          <div className="container">
            {sponsord && <div className="headtitle">
              <h6>Referred by: {sponsord}</h6>
            </div>}
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="banner-txt">
                  <h3>This $20 business changes</h3>
                  <h1>EVERYTHING</h1>
                  <h4>A Global Opportunity</h4>
                  <h2>WATCH THIS VIDEO</h2>
                  <p>Network Marketing will never be the same</p>
                  <div className="video-bx">
                    <div className="youtube-video">
                      <iframe width="100%" height={420} src="https://www.youtube.com/embed/65JiGVxLvlg" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                    </div>
                    <a href="javascript:void(0);" className="play-icon">
                      <i className="far fa-play-circle fa-fw" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="join-frm">
                  <div className="join-block">
                    <h2><span>Easy</span> TO JOIN AND SHARE</h2>
                    <h3>Includes Complete Marketing System</h3>
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
                      <label>Phone No:</label>
                      <input onChange={e => setPhoneNumber(e.target.value)} value={phoneNumber} type="text" name placeholder className="form-control" />
                    </div>

                    <h3>Submit your information below OR Skip it and JOIN NOW</h3>
                    <button onClick={handleSubmit} type="submit">Save My Spot</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="quality-wrp">
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
        </section>
        <section className="money-back-wrp">
          <div className="container">
            <h2>Our Matrix automatically places everyone that joins <span>AFTER</span><br /> you <span>BELOW</span> you to <span>MAXIMIZE</span> earnings and support</h2>
            <div className="row">
              <div className="col-md-7 col-sm-12">
                <div className="money-data">
                  <h3>No Ridiculous Qualifiers</h3>
                  <ul>
                    <li>Up to $3,279.00 per month. No sponsoring </li>
                    <li>10 Levels of Fast Start Bonuses</li>
                    <li>10 Levels of Retail Bonuses</li>
                    <li>10 Levels of Wholesale Bonuses</li>
                    <li>5 Levels of Check Match Bonuses</li>
                    <li>3 x 10 FORCED Matrix = 88,572<br /> (Compare to a 2 x 15 with only 65,534)</li>
                  </ul>
                </div>
              </div>
              <div className="col-md-5 col-sm-12">
                <div className="money-back-img">
                  <img src="/images/complogo2.png" alt />
                </div>
              </div>
            </div>
          </div>
        </section>
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
            Who reffered you?
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
    </HomeLayout>
  )
}
