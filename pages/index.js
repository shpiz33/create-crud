import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Container from 'react-bootstrap/Container';

export default function Home() {
  const formEl = useRef();
  const [data, setData] = useState([]);
  const [formState, setFormState] = useState(
    {
      _id: '',
      name: "",
      nickname: "",
      tel: "",
      age: "",
      address: "",
    }
  )

  useEffect(() => {
    readData();
  }, []);

  const readDataById = async (id) => {
    await axios({
      method: "get",
      url: '/api/user/' + id
    }).then(res => {
      formEl.current.name.value = res.data.name;
      formEl.current.nickname.value = res.data.nickname;
      formEl.current.tel.value = res.data.tel;
      formEl.current.age.value = res.data.age;
      formEl.current.address.value = res.data.address;
      setFormState(res.data);
    })
  }

  const readData = async () => {
    await axios({
      method: "get",
      url: '/api/user/'
    }).then(res => {
      setData(res.data);
    })
  }

  const deleteUser = async (id) => {
    try {
      await axios({
        method: "delete",
        url: '/api/user/' + id
      })
      await readData();
      alert('ลบข้อมมูลสำเร็จแล้วน้าบบบบ')
    } catch (error) {
      alert("Error: นะน้าบสุดสวยจุ๊บมั๊ววววว");
    }
  }

  return (
    <div>
      {inputData()}

      {getData()}
    </div>
  )

  function getData() {
    return <section id="read-data">
      <h1>ข้อมูลทั้งหมด</h1>

      <ul>
        {data.map((e, index) => (
          <li key={e._id}>
            {e.name}
            <ul>
              <li>name: {e.name}</li>
              <lt>nickname: {e.nickname}</lt>
              <li>age: {e.age}</li>
              <li>address: {e.address}</li>
              <li>tel: {e.tel}</li>
              <button onClick={() => readDataById(e._id)}>Edit</button>
              <button onClick={() => deleteUser(e._id)}>Delete</button>
            </ul>
          </li>
        ))}

      </ul>
    </section>;
  }

  function inputData() {
    return <section id="input-data">
      <h1>{formState?._id ? 'แก้ไขข้อมูล' : 'เพิ่มข้อมูล'}</h1>
      <form ref={formEl} onSubmit={async (e) => {
        e.preventDefault();
        const form = e.target;

        if (!form.name.value){
          alert('กรุณากรอกชื่อนะน้าบบบบ')
          return
        }

        if (!form.nickname.value){
          alert('กรุณากรอกชื่อเล่นนะน้าบบบบ')
          return
        }

        if (!form.tel.value){
          alert('กรุณากรอกเบอร์นะน้าบบบบ')
          return
        }

        if (!form.age.value){
          alert('กรุณากรอกอายุนะน้าบบบบ')
          return
        }

        if (!form.address.value){
          alert('กรุณากรอกที่อยู่นะน้าบบบบ')
          return
        }

        


        try {
          await axios({
            method: formState?._id ? "PUT" : "POST",
            url: formState?._id ? "/api/user/" + formState?._id : "/api/user/",
            data: {
              name: form.name.value,
              nickname: form.nickname.value,
              tel: form.tel.value,
              address: form.address.value,
              age: form.age.value,
            }
          });
          setFormState({});
          setData([]);
          form.reset();
          await readData();
          alert("ข้อมูลสำเร็จ");
        } catch (error) {
          alert("ERROR: ข้อมูลไม่สำเร็จ ");

        }

      }}>

        <label>name</label>
        <input type="text" name="name" />

        <br />

        <label>nickname</label>
        <input type="text" name="nickname" />

        <br />

        <label>tel</label>
        <input type="tel" name="tel" />

        <br />


        <label>address</label>
        <textarea name="address" />

        <br />

        <label>age</label>
        <input type="number" name="age" />

        <br />

        <button type="submit"> SAVE </button>
        <button type="reset"> RESET </button>

      </form>
    </section>;
  }
}
