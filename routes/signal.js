const uuid =                require('uuid')
const {dbProximity} =       require('../db')
const { g, b, gr, r, y } =  require('../console')

// websocketevents and redis events
const {wss} =               require('../events');
const {events} =            require('../events')

let pub
let redis

const createServers = () => {
  return new Promise(async (resolve, reject) => {
    const servers = await events()
    resolve(servers)
  })  
}
const startBroadcasts = async() => {
  const servers = await createServers()  
  pub = servers['pub']  
  redis = servers['redis']   
}
startBroadcasts()

//////////////////////////////////////////


module.exports = signal = (router) => {
	router.use(async(req, res, next) => {
       

    const startRandomSignals = (int) => {
      let id
      id = setInterval(function() {
        let arr = []
        let gateway = {
          timestamp: '2020-11-16T20:28:22.456Z',
          type: 'venue',  // note that physical device sets to Gateway
          mac: 'AC233FC07DA5',
          gatewayFree: 42,
          gatewayLoad: 1.15
        }
        let subscriber =
        {
          timestamp: '2020-11-16T20:28:25.365Z',
          type: 'subscriber',
          mac: '0BE383050DE8',
          bleName: '',
          ibeaconUuid: '6A08635B25F7410A8CF860EEFA2E6EAB',
          ibeaconMajor: 1000,
          ibeaconMinor: 1500,
          rssi: -58,
          ibeaconTxPower: -70,
          battery: 0
        }
       
        gateway.mac = uuid.v1()
        gateway.timestamp = Date.now()
        subscriber.timestamp = Date.now()
        subscriber.ibeaconUuid = uuid.v1()
        arr.push(gateway)
        arr.push(subscriber)      
        
        pub.publish('detect', JSON.stringify(arr))

        let message = `---Gateway: ${gateway.mac} Subscriber: ${subscriber.mac} Detected: ${subscriber.timestamp} -----`
        wss.clients.forEach((client) => {
          if (client.readyState === 1) {
              client.send(JSON.stringify([message]))
          }
        });

      }, int)
    }
     
    res.status(200).redirect('/')
     
    startRandomSignals(300)

    next()
  })  
}


 
 
  
  
 

  
