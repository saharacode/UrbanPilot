package de.neuefische.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.backend.model.user.ImportMongoUserDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.junit.jupiter.api.Assertions.*;
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
    @WithMockUser(username = "testuser", password = "testpassword")
    void login_thenReturnStatus200_andUsernameString() throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("/user/login")
                        .with(csrf()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("testuser"));
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "testuser", password = "testpassword")
    void logout_thenReturnStatus200_andLogoutSuccessfulString_andExpectInvalidSession_andExpectEmptySecContHolder() throws Exception {
        MockHttpSession mockHttpSession = new MockHttpSession();
        assertEquals("testuser",SecurityContextHolder.getContext().getAuthentication().getName());
        assertFalse(mockHttpSession.isInvalid());

        mvc.perform(MockMvcRequestBuilders.post("/user/logout")
                        .with(csrf())
                        .session(mockHttpSession))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("Logout successful"));

        assertTrue(mockHttpSession.isInvalid());
        assertNull(SecurityContextHolder.getContext().getAuthentication());
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
    void registerUser_thenReturnStatus409() throws Exception {
        ImportMongoUserDTO firstNewUserWithoutId = ImportMongoUserDTO.builder()
                .username("testuser")
                .fullname("testuser")
                .password("testpassword")
                .email("test@mail.de")
                .homecity("Berlin")
                .build();

        ObjectMapper objectMapper = new ObjectMapper();
        String jsonRequestBodyFirstUser = objectMapper.writeValueAsString(firstNewUserWithoutId);

        mvc.perform(MockMvcRequestBuilders.post("/user/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequestBodyFirstUser)
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

        ImportMongoUserDTO secondNewUserWithoutId = ImportMongoUserDTO.builder()
                .username("testuser")
                .fullname("testuser")
                .password("testpassword")
                .email("test@mail.de")
                .homecity("Berlin")
                .build();

        String jsonRequestBodySecondUser = objectMapper.writeValueAsString(secondNewUserWithoutId);

        mvc.perform(MockMvcRequestBuilders.post("/user/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequestBodySecondUser)
                        .with(csrf()))
                .andExpect(status().isConflict());
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

        mvc.perform(MockMvcRequestBuilders.get("/user/details")
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