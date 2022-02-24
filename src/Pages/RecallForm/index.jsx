import React, { useEffect, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { partyGuestsActionCreator } from '../../ActionCreators';

const Form = styled.form`
  padding: 20px;
  display: block;
  width: 25vw;
  margin: 70px auto;
  background-color: #a9a9a9;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0,0,0,0.5);
`;

const P = styled.p`
  font-size: 20px;
  padding-top: 20px;
  padding-bottom: 10px;
`;

const Name = styled.div`
  font-size: 20px;
  color: #696969;
`;

const Button = styled.input`
  background-color: #54b654;
  display: block;
  width: 100%;
  margin-top: 20px;
  border-radius: 8px;
  height: 25px;
  box-shadow: 2px 2px 10px rgba(0,0,0,0.7);
  cursor: pointer;
  :active{
    opacity: 0.7;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
  }
`;

const Input = styled.input`
  width: 100%;
  font-size: 20px;
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 200px;
  font-size: 20px;
  border-radius: 5px;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonDelete = styled.button`
  font-size: 15px;
  color: #f60202;
  padding-right: 40px;
  background-color: #a9a9a9;
  cursor: pointer;
`;

const RecallForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const partyGuests = useSelector(createSelector((state) => state.loading.partyGuests, (data) => data));

  const re = /^([+]?[0-9\s ()]{3,10})*$/i;
  const [rating, setRating] = useState(60);
  const [errorPhone, setErrorPhone] = useState(false);
  const [button, setButton] = useState(false);
  const [feedback, setFeedback] = useState(false);

  useEffect(() => {
    const man = partyGuests.find((people) => people.name === params.manName);
    setFeedback(man);
    man.feedback && setRating(man.rating);
  }, []);

  const { register, handleSubmit, watch } = useForm();

  useEffect(() => {
    const subscription = watch((value) => {
      re.test(value.phone) ? setErrorPhone(false) : setErrorPhone(true);
      if (re.test(value.phone) && value.comment) {
        setButton(true);
      } else {
        setButton(false);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = (data) => {
    if (button) {
      const manIndex = partyGuests.findIndex((people) => people.name === params.manName);
      const manNewData = {
        ...partyGuests[manIndex],
        phone: data.phone,
        comment: data.comment,
        rating,
        feedback: true,
      };
      dispatch(partyGuestsActionCreator(
        partyGuests.map((item) => {
          if (item.name === params.manName) {
            return manNewData;
          }
          return item;
        }),
      ));
    }

    navigate('/table');
  };

  const deleteField = () => {
    const deleteProperty = { ...feedback };
    delete deleteProperty.phone;
    delete deleteProperty.comment;
    delete deleteProperty.feedback;

    dispatch(partyGuestsActionCreator(
      partyGuests.map((item) => {
        if (item.name === deleteProperty.name) {
          return deleteProperty;
        }
        return item;
      }),
    ));

    navigate('/table');
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Flex>
        <P>NAME</P>
        {feedback.feedback && <ButtonDelete onClick={deleteField}>delete</ButtonDelete>}
      </Flex>
      <Name>{params.manName}</Name>
      <Rating onClick={handleRating} ratingValue={rating} />
      <P>PHONE</P>
      {feedback.feedback
        ? <Name>{feedback.phone}</Name>
        : (
          <>
            <Input
              /* eslint-disable-next-line react/jsx-props-no-spreading */
              {...register('phone', {
                pattern: /^([+]?[0-9\s ()]{3,10})*$/i,
              })}
            />
            <div>
              {errorPhone && <p style={{ color: 'red', margin: 10 }}>Fill in the field correctly</p>}
            </div>
          </>
        )}
      <P>COMMENT</P>
      {feedback.feedback
        ? <Name>{feedback.comment}</Name>
        : (
          <Textarea
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...register('comment', {
            })}
          />
        )}
      {!feedback.feedback && <Button type="submit" value={button ? 'SAVE' : 'CANCEL'} />}
    </Form>
  );
};

export default RecallForm;
