import {
  IonList,
  IonItem,
  IonInput,
  IonLabel,
  IonButton,
  IonCheckbox,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
} from "@ionic/react";
import React, { useState } from "react";
import "./ExploreContainer.css";
import { Plugins } from "@capacitor/core";

const ExploreContainer: React.FC = () => {
  const [mid, setMid] = useState("");
  const [orderId, setOrderId] = useState("");
  const [amount, setAmount] = useState("");
  const [txnToken, setTxnToken] = useState("");
  const [isStaging, setIsStaging] = useState(false);
  const [response, setResponse] = useState<string>();
  const [initiateTxnResponse, setInitiateTxnResponse] = useState<string>();
  const [restrictAppInvoke, setRestrictAppInvoke] = useState(false);
  const { AllInOneSDK } = Plugins;
  

  const startTransaction = async () => {
    setResponse("");
    if (txnToken != null && txnToken != "") {
      setInitiateTxnResponse(txnToken);
      try {
        let response = await AllInOneSDK.startTransaction({ mid: mid, amount: amount, orderId: orderId, callbackUrl: "", txnToken: txnToken, isStaging: isStaging, restrictAppInvoke: restrictAppInvoke });
        setResponse(response);
      } catch (err) {
        setResponse("Error - " + err.message);
      }
    } else {
      setInitiateTxnResponse("Please enter transaction token");
    }
  };

  return (
    <IonList>
      <IonItem>
        <IonLabel position="stacked">Enter Mid</IonLabel>
        <IonInput
          value={mid}
          onIonChange={(e) => setMid(e.detail.value!)}
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Enter Order ID</IonLabel>
        <IonInput
          value={orderId}
          onIonChange={(e) => setOrderId(e.detail.value!)}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonLabel position="stacked">Enter Amount</IonLabel>
        <IonInput
          value={amount}
          onIonChange={(e) => setAmount(e.detail.value!)}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonLabel position="stacked">Enter transaction token</IonLabel>
        <IonInput value={txnToken} onIonChange={(e) => setTxnToken(e.detail.value!)}></IonInput>
      </IonItem>

      <IonItem>
        <IonLabel>Staging: {JSON.stringify(isStaging)}</IonLabel>
        <IonCheckbox
          checked={isStaging}
          onIonChange={(e) => setIsStaging(e.detail.checked)}
        />
      </IonItem>

      <IonItem>
        <IonLabel>Restrict Paytm App Invoke: {JSON.stringify(restrictAppInvoke)}</IonLabel>
        <IonCheckbox
          checked={restrictAppInvoke}
          onIonChange={(e) => setRestrictAppInvoke(e.detail.checked)}
        />
      </IonItem>

      <IonButton
        color="secondary"
        expand="block"
        onClick={() => startTransaction()}
      >
        Start Transaction
      </IonButton>

      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle mode="md" color="secondary">
            Initiate Transaction Response
          </IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent mode="md">{JSON.stringify(initiateTxnResponse)}</IonCardContent>
      </IonCard>

      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle mode="md" color="secondary">
            Paytm Callback Response
          </IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent mode="md">{JSON.stringify(response)}</IonCardContent>
      </IonCard>
    </IonList>
  );
};

export default ExploreContainer;
