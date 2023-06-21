package de.neuefische.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.backend.model.ImportMongoUserDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {

    @Autowired
    MockMvc mvc;

    @Test
    @DirtiesContext
    void login() throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("/user/login"))
                //.with(csrf()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("testuser"));
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "testuser", password = "testpassword")
    void logout_thenReturnStatus200_andLogoutSuccessfulString() throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("/user/logout")
                        .with(csrf()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("Logout successful"));
    }

    @Test
    @DirtiesContext
    void registerUser_thenReturnStatus201_andProfileDetailsAsDTO() throws Exception {
        ImportMongoUserDTO newUserWithoutId = ImportMongoUserDTO.builder()
                .username("testuser")
                .fullname("testuser")
                .password("testpassword")
                .email("test@mail.de")
                .homecity("Berlin")
                .build();

        ObjectMapper objectMapper = new ObjectMapper();
        String jsonRequestBody = objectMapper.writeValueAsString(newUserWithoutId);

        mvc.perform(MockMvcRequestBuilders.post("/user/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequestBody)
                        .with(csrf()))
                .andExpect(status().isCreated())
                .andExpect(content().json("""
                    {
                        "username":"testuser",
                        "fullname":"testuser",
                        "email":"test@mail.de",
                        "homecity":"Berlin"
                    }
                """));
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "testuser", password = "testpassword")
    void getProfileDetails_thenReturnStatus200_andProfileDetailsAsDTO() throws Exception {
        ImportMongoUserDTO newUserWithoutId = ImportMongoUserDTO.builder()
                .username("testuser")
                .fullname("testuser")
                .password("testpassword")
                .email("test@mail.de")
                .homecity("Berlin")
                .build();

        ObjectMapper objectMapper = new ObjectMapper();
        String jsonRequestBody = objectMapper.writeValueAsString(newUserWithoutId);

        mvc.perform(MockMvcRequestBuilders.post("/user/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequestBody)
                        .with(csrf()))
                .andExpect(status().isCreated());

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
}