
import React, { useEffect, useState }  from 'react';
import { IonButton, IonList,IonInput, IonLabel,IonItem,  IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ipfsClient from 'ipfs-http-client';
//import OrbitDB from 'orbit-db';
import './Tab2.css';

const Tab2: React.FC = () =>  {
  const [username, setUsername] = useState('');
  const [filehash, setFilehash] = useState('');
//
//  const [keepfile, setKeepfile] = useState('');
//  const [password, setPassword] = useState('');
  const listnamevalue = '';
  const liststatvalue = '';
  const mylist: any[] = [{sname: 'sssh',cidd:'djdd'}, {ddname:'shsh', ciddd:'shhs'}];
  const mylist1: any[] = [];


  const ipfs = ipfsClient('/ip4/157.245.63.46/tcp/5001')


 // const [orbitdb, setOrbit] = useState();

 

  const login = async () => {
//  var  orbitdb1 = new OrbitDB(ipfs);
//    setOrbit(orbitdb1)

    try {
    var x = await ipfs.version();
    // var y = await orbitdb.keyvalue('my-database');
    console.log(x);
    // console.log(y);
    } catch (err) {
     console.log(err);
    }
  };
/*
  const saveToIpfs = async (files) => {
    const source = ipfs.add(
      [...files],
      {
        progress: (prog) => console.log(`received: ${prog}`)
      }
    )
    try {
      for await (const file of source) {
        console.log(file)
        setFilehash(file.path )
      }
    } catch (err) {
      console.error(err)
    }
  };
*/

 const handleSubmit = (event) => {
    event.preventDefault()
  };

  const captureFile = (event) => {
    event.stopPropagation()
    event.preventDefault()

      saveToIpfsWithFilename(event.target.files)
/*
    if (keepfile) {
      saveToIpfsWithFilename(event.target.files)
    } else {

      saveToIpfs(event.target.files)
    }
*/

  };

  const saveToIpfsWithFilename = async (files) => {
    const file = [...files][0]
    const options = {
    create: true
    }

    const source = ipfs.files.write('/user1/contents/'+file.name, file, options)
        console.log(source)
        setFilehash('/user1/contents/'+ file.name);
  };


  const listfiles = async () => {
    var options = {};
 var source = ipfs.files.ls('/user1/contents/', options)
    try {
      for await (const file of source) {
        console.log(file)
        mylist1.push(file); 
      }
    } catch (err) {
      console.error(err)
    }

  };


  const liststat = async () => {
    var options = {};
    var source = await ipfs.files.stat('/user1/contents/', options)
        console.log(source)

  };

  useEffect(() => {
        mylist1.map(a=> {

      mylist.push(a);

        });

  });

  const mkdirfunc = async () => {
    var options = {parents: true};
    var source = await ipfs.files.mkdir('/user1/contents', options)
        console.log(source)
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
    <div>
        <form id='captureMedia' onSubmit={handleSubmit}>
          <input type='file' onChange={captureFile} /><br/>
        </form>
        </div>
  <div>
          <a target='_blank' rel="noopener noreferrer"
            href={'https://ipfs.io/ipfs/' + filehash}>
            {filehash}
          </a>
        </div>

            <IonButton onClick={mkdirfunc}> Mkdir </IonButton>
    <IonList>
            <IonItem >
              <IonLabel position="stacked" color="primary">Username</IonLabel>
              <IonInput name="username" type="text" value={username} spellCheck={false} autocapitalize="off" onIonChange={e => setUsername(e.detail.value!)}
                required>
              </IonInput>
            </IonItem>
            <IonButton onClick={login}> Test button
            </IonButton>
            <IonItem >
              <IonInput name="listname" type="text" placeholder="List" value={listnamevalue} spellCheck={false} autocapitalize="off" >
            <IonButton onClick={listfiles}> List </IonButton>
              </IonInput>
            </IonItem>
            <IonItem >
              <IonInput name="liststat" type="text" placeholder="Stat" value={liststatvalue} spellCheck={false} autocapitalize="off" >
            <IonButton onClick={liststat}> Stat </IonButton>
              </IonInput>
            </IonItem>
       {
           mylist.map((a) =>      {
         return (  <IonItem>
                  {a['name']}
           <IonButton href={a.cid} color="primary" slot="end">Read</IonButton>
            </IonItem>
          ) 
          })
       }  
    </IonList>

    <p> Hello </p>
   

      </IonContent>
    </IonPage>
  );
};

export default Tab2;
