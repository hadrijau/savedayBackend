import axios from "axios";
import xml2js from "xml2js";

export async function create_etiquette(mail_acheteur, cart, adresse) {
  var data =
    '<?xml version="1.0" encoding="utf-8"?>\r\n<ShipmentCreationRequest xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\r\nxmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns="http://www.example.org/Request">\r\n    <Context>\r\n        <Login>MRKVALOC@business-api.mondialrelay.com</Login>\r\n        <Password>:0qjMV1DpHrMJPymQBkq</Password>\r\n        <CustomerId>MRKVALOC</CustomerId>\r\n        <Culture>fr-FR</Culture>\r\n        <VersionAPI>1.0</VersionAPI>\r\n    </Context>\r\n    <OutputOptions>\r\n        <OutputFormat>10x15</OutputFormat>\r\n        <OutputType>PdfUrl</OutputType>\r\n    </OutputOptions>\r\n    <ShipmentsList>\r\n        <Shipment>\r\n            <OrderNo>KDZ-9999</OrderNo>\r\n            <CustomerNo>CUS1234</CustomerNo>\r\n            <ParcelCount>1</ParcelCount>\r\n            <DeliveryMode Mode="24R" Location="FR-66974" />\r\n            <CollectionMode Mode="REL" Location="" />\r\n            <Parcels>\r\n                <Parcel>\r\n                    <Content>Livres</Content>\r\n                    <Weight Value="1000" Unit="gr" />\r\n                </Parcel>\r\n            </Parcels>\r\n            <DeliveryInstruction>Livrer au fond a droite</DeliveryInstruction>\r\n            <Sender>\r\n                <Address>\r\n                    <Title />\r\n                    <Firstname />\r\n                    <Lastname />\r\n                    <Streetname>Avenue Antoine Pinay</Streetname>\r\n                    <HouseNo>4</HouseNo>\r\n                    <CountryCode>FR</CountryCode>\r\n                    <PostCode>59510</PostCode>\r\n                    <City>HEM</City>\r\n                    <AddressAdd1>Mondial Relay</AddressAdd1>\r\n                    <AddressAdd2 />\r\n                    <AddressAdd3>Mondial Relay</AddressAdd3>\r\n                    <PhoneNo />\r\n                    <MobileNo>+33320202020</MobileNo>\r\n                    <Email>contact@mondialrelay.fr</Email>\r\n                </Address>\r\n            </Sender>\r\n            <Recipient>\r\n                <Address>\r\n                    <Title>Mr</Title>\r\n                    <Firstname>John</Firstname>\r\n                    <Lastname>THETESTER</Lastname>\r\n                    <Streetname>test street</Streetname>\r\n                    <HouseNo>10</HouseNo>\r\n                    <CountryCode>FR</CountryCode>\r\n                    <PostCode>75001</PostCode>\r\n                    <City>Paris 1</City>\r\n                    <AddressAdd1 />\r\n                    <AddressAdd2 />\r\n                    <AddressAdd3 />\r\n                    <PhoneNo>+33320202020</PhoneNo>\r\n                    <MobileNo />\r\n                    <Email>clemdu32330@gmail.com</Email>\r\n                </Address>\r\n            </Recipient>\r\n        </Shipment>\r\n    </ShipmentsList>\r\n</ShipmentCreationRequest>';

  const parsed_data = await new Promise((resolve) => {
    xml2js.parseString(data, (err, result) => {
      resolve(result);
    });
  });
  console.log(
    JSON.stringify(parsed_data.ShipmentCreationRequest.ShipmentsList[0])
  );

  const new_ShipmentList = {
    Shipment: [
      {
        OrderNo: ["KDZ-9999"],
        CustomerNo: ["CUS1234"],
        ParcelCount: ["1"],
        DeliveryMode: [{ $: { Mode: "24R", Location: "FR-66974" } }],
        CollectionMode: [{ $: { Mode: "REL", Location: "" } }],
        Parcels: [
          {
            Parcel: [
              {
                Weight: [{ $: { Value: "1000", Unit: "gr" } }],
              },
            ],
          },
        ],
        Sender: [
          {
            Address: [
              {
                Title: [""],
                Firstname: [""],
                Lastname: [""],
                Streetname: ["Avenue Antoine Pinay"],
                HouseNo: ["4"],
                CountryCode: ["FR"],
                PostCode: ["59510"],
                City: ["HEM"],
                AddressAdd1: ["Mondial Relay"],
                AddressAdd2: [""],
                AddressAdd3: ["Mondial Relay"],
                PhoneNo: [""],
                MobileNo: ["+33320202020"],
                Email: ["contact@mondialrelay.fr"],
              },
            ],
          },
        ],
        Recipient: [
          {
            Address: [
              {
                Title: [""],
                Firstname: [],
                Lastname: [],
                Streetname: ["test street"],
                HouseNo: ["10"],
                CountryCode: ["FR"],
                PostCode: ["75001"],
                City: ["Paris 1"],
                AddressAdd1: [""],
                AddressAdd2: [""],
                AddressAdd3: [""],
                PhoneNo: ["+33320202020"],
                MobileNo: [""],
                Email: [mail_acheteur],
              },
            ],
          },
        ],
      },
    ],
  };

  var config = {
    method: "post",
    url: "https://connect-api.mondialrelay.com/api/shipment",
    headers: {
      "Content-Type": "text/xml",
    },
    data: data,
  };

  /*axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });*/
}
