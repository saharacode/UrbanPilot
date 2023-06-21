package de.neuefische.backend.controller;

import de.neuefische.backend.model.ReturnMongoUserDTO;
import de.neuefische.backend.service.MongoUserService;
import okhttp3.mockwebserver.MockResponse;
import okhttp3.mockwebserver.MockWebServer;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class IntegrationTestForUserController {

    @Autowired
    MockMvc mvc;

    @MockBean
    private MongoUserService mongoUserService;

    /*
    private static MockWebServer mockWebServer;

    @DynamicPropertySource
    static void setProperties(DynamicPropertyRegistry registry) {
        registry.add("MONGO_URI",() -> mockWebServer.url("/").toString());
    }

    @BeforeAll
    static void startMockServer() throws Exception {
        mockWebServer = new MockWebServer();
        mockWebServer.start();
    }

    @AfterAll
    static void stopMockServer() throws Exception {
        mockWebServer.shutdown();
    }

     */

    @Test
    void login() {
    }

    @Test
    void logout() {
    }

    @Test
    @DirtiesContext
    void registerUser() throws Exception {

        mvc.perform(MockMvcRequestBuilders.post("/user/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                            {
                                "username": "testuser",
                                "password": "testpassword",
                                "fullname": "testuser",
                                "email": "test@mail.de",
                                "homecity": "Berlin"
                            }
                        """))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                    {
                        "username": "testuser",
                        "fullname": "testuser",
                        "email": "test@mail.de",
                        "homecity": "Berlin"
                    }
                """));
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "testuser", password = "testpassword")
    void getProfileDetails_thenReturnProfileDetailsAsDTO() throws Exception {
        ReturnMongoUserDTO testuser = ReturnMongoUserDTO.builder()
                .username("testuser")
                .fullname("testuser")
                .email("test@mail.de")
                .homecity("Berlin")
                .build();

        when(mongoUserService.getProfileDetails("testuser")).thenReturn(testuser);

        mvc.perform(MockMvcRequestBuilders.get("/user/details/testuser"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                    {
                        "username": "testuser",
                        "fullname": "testuser",
                        "email": "test@mail.de",
                        "homecity": "Berlin"
                    }
                """));
    }

    /*
     @Test
    @DirtiesContext
    @WithMockUser(username = "testuser", password = "testpassword")
    void getProfileDetails_thenReturnProfileDetailsAsDTO() throws Exception {
        mockWebServer.enqueue(new MockResponse()
                .setHeader("Content-Type", "application/json")
                .setBody("""
                            {
                              "username": "testuser",
                              "password": "testpassword",
                              "fullname": "testuser",
                              "email": "test@mail.de",
                              "homecity": "Berlin"
                            }
                        """));

        mvc.perform(MockMvcRequestBuilders.get("/user/details/testuser")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                    {
                        "username": "testuser",
                        "fullname": "testuser",
                        "email": "test@mail.de",
                        "homecity": "Berlin"
                    }
                """));
    }
     */
}