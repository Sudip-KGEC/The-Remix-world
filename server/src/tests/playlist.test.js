const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../app");

const createTestUser = require("./helpers/testUser");
const generateToken = require("./helpers/token");
const authHeader = require("./helpers/authHeaders");

describe("Playlist APIs", () => {

  let token;

  beforeAll(async () => {
    const user = await createTestUser("USER");
    token = generateToken(user._id, "USER");
  });


  /**
   * CREATE PLAYLIST
   */
  test("Create playlist", async () => {

    const res = await request(app)
      .post("/api/v1/playlists")
      .set(authHeader(token))
      .send({ name: "Workout Mix" });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.playlist.name).toBe("Workout Mix");

  });


  /**
   * GET PLAYLIST
   */
  test("Get playlist", async () => {

    const create = await request(app)
      .post("/api/v1/playlists")
      .set(authHeader(token))
      .send({ name: "Test Playlist" });

    const playlistId = create.body.playlist._id;

    const res = await request(app)
      .get(`/api/v1/playlists/${playlistId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);

  });


  /**
   * ADD SONG
   */
  test("Add song to playlist", async () => {

    const create = await request(app)
      .post("/api/v1/playlists")
      .set(authHeader(token))
      .send({ name: "Song Playlist" });

    const playlistId = create.body.playlist._id;

    const fakeSongId = new mongoose.Types.ObjectId();

    const res = await request(app)
      .post(`/api/v1/playlists/${playlistId}/songs`)
      .set(authHeader(token))
      .send({ songId: fakeSongId });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);

  });


  /**
   * DELETE PLAYLIST
   */
  test("Delete playlist", async () => {

    const create = await request(app)
      .post("/api/v1/playlists")
      .set(authHeader(token))
      .send({ name: "Delete Playlist" });

    const playlistId = create.body.playlist._id;

    const res = await request(app)
      .delete(`/api/v1/playlists/${playlistId}`)
      .set(authHeader(token));

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);

  });


  /**
   * UNAUTHORIZED
   */
  test("Unauthorized access", async () => {

    const res = await request(app)
      .post("/api/v1/playlists")
      .send({ name: "Test Playlist" });

    expect(res.statusCode).toBe(401);

  });

});