import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getBoardsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const demBoards = response.data;
      const boards = [];
      if (demBoards != null) {
        Object.keys(demBoards).forEach((fbId) => {
          demBoards[fbId].id = fbId;
          boards.push(demBoards[fbId]);
        });
      }
      resolve(boards);
    }).catch((err) => reject(err));
});

const getSingleBoard = (boardId) => axios.get(`${baseUrl}/boards/${boardId}.json`);

const newBoard = (boardObj) => axios.post(`${baseUrl}/boards.json`, boardObj);

const updateBoard = (boardId, newBoardObj) => axios.put(`${baseUrl}/boards/${boardId}.json`, newBoardObj);

export default {
  getBoardsByUid,
  getSingleBoard,
  newBoard,
  updateBoard,
};
