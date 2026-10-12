const request = require("supertest");
const server = require("../index");

// describe("Operaciones CRUD de cafes", () => { });

describe("Pruebas API Cafetería Nanacao", () => {
    it("GET /cafes devuelve status 200 y un arreglo con al menos un café", async () => {
        const response = await request(server).get("/cafes").send();

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThanOrEqual(1);
    });

    it("DELETE /cafes devuelve 404 cuando el café no existe", async () => {
        const response = await request(server)
            .delete("/cafes/999999")
            .set("Authorization", "Bearer token")
            .send();

        expect(response.statusCode).toBe(404);
    });


    it("POST /cafes agrega un nuevo café y devuelve status 201", async () => {
        const nuevoCafe = {
            id: 99,
            nombre: "Café de prueba"
        };

        const response = await request(server)
            .post("/cafes")
            .send(nuevoCafe);

        expect(response.statusCode).toBe(201);
        expect(response.body).toContainEqual(nuevoCafe);
    });


    it("PUT /cafes devuelve 400 si los IDs son diferentes", async () => {
        const cafeActualizado = {
            id: 2,
            nombre: "Café actualizado"
        };

        const response = await request(server)
            .put("/cafes/1")
            .send(cafeActualizado);

        expect(response.statusCode).toBe(400);
    });


});
