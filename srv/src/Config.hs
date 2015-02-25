module Config(
    serverPort
,   mongoHost
,   mongoPort
,   mongoCollection
,   mongoAuth
,   mongoNominalDiffTime
) where
    
import Data.Text (pack)
import Data.Time.Clock (NominalDiffTime)
import Network (PortID (PortNumber))

serverPort = 8080 :: Int

mongoHost = "localhost"
mongoPort = PortNumber 27017 
mongoCollection = pack "test"
mongoAuth = Nothing
mongoNominalDiffTime = 2000 :: NominalDiffTime
