import React, { useState } from 'react';
import { Button, Card, Modal, Form, Input } from 'antd';

const AddPet = {
  margin: '10px',
};

const CardStyle = {
  width: 240,
  margin: '10px',
};

const pets = [
  {
    name: 'name',
    species: 'species',
    breed: 'breed',
    age: 'age',
    weight: 'lbs',
    personality: 'personality',
    vaccinations: 'vaccinations',
  },
  {
    name: 'name',
    species: 'species',
    breed: 'breed',
    age: 'age',
    weight: 'lbs',
    personality: 'personality',
    vaccinations: 'vaccinations',
  },
  {
    name: 'name',
    species: 'species',
    breed: 'breed',
    age: 'age',
    weight: 'lbs',
    personality: 'personality',
    vaccinations: 'vaccinations',
  },
];

const PetDisplay = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [petInfo, setPetInfo] = useState({});

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = e => {
    setPetInfo({
      ...petInfo,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="pet-display">
      <>
        <Button
          onClick={showModal}
          type="primary"
          htmlType="submit"
          style={AddPet}
        >
          Add a new pet
        </Button>
        <Modal
          title="Basic Modal"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <form>
            <Form.Item label="First Name" name="name">
              <Input
                name="name"
                onChange={handleChange}
                placeholder={pets[0].name}
              />
            </Form.Item>
            <Form.Item label="Species" name="species">
              <Input
                name="species"
                onChange={handleChange}
                placeholder={pets[0].species}
              />
            </Form.Item>
            <Form.Item label="Breed" name="breed">
              <Input
                name="breed"
                onChange={handleChange}
                placeholder={pets[0].breed}
              />
            </Form.Item>
            <Form.Item label="Age" name="age">
              <Input
                name="age"
                onChange={handleChange}
                placeholder={pets[0].age}
              />
            </Form.Item>
            <Form.Item label="Weight" name="weight">
              <Input
                name="weight"
                onChange={handleChange}
                placeholder={pets[0].weight}
              />
            </Form.Item>
            <Form.Item label="Personality or quirks" name="personality">
              <Input
                name="personality"
                onChange={handleChange}
                placeholder={pets[0].personality}
              />
            </Form.Item>
            <Form.Item label="vaccinations" name="vaccinations">
              <Input
                name="vaccinations"
                onChange={handleChange}
                placeholder={pets[0].vaccinations}
              />
            </Form.Item>
          </form>
        </Modal>
      </>
      {pets.map(pet => {
        return (
          <Card style={CardStyle}>
            <h1>{pet.name}</h1>
            <p>{pet.animal}</p>
            <p>{pet.breed}</p>
            <p>{pet.age}</p>
            <p>{pet.weight}</p>
            <p>{pet.personality}</p>
            <p>{pet.vaccinations}</p>
          </Card>
        );
      })}
    </div>
  );
};

export default PetDisplay;