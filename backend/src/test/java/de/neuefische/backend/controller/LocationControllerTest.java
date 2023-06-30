package de.neuefische.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.jsonpath.JsonPath;
import de.neuefische.backend.model.location.ImportLocationDTO;
import de.neuefische.backend.model.user.ImportMongoUserDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class LocationControllerTest {
    @Autowired
    MockMvc mvc;

    @Test
    @DirtiesContext
    @WithMockUser(username = "testuser", password = "testpassword")
    void getAllLocationsForUser_thenReturnStatus200_andEmptyListForUserWithoutLocations() throws Exception {
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

        mvc.perform(MockMvcRequestBuilders.get("/locations/all")
                .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                            [
                            ]
                        """));
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "testuser", password = "testpassword")
    void getAllLocationsForUser_thenReturnStatus200_andListWithOneLocation() throws Exception {
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

        ImportLocationDTO testImportLocationDTO = ImportLocationDTO.builder()
                .locationName("TestName")
                .locationCity("TestCity")
                .locationDescription("TestDescription")
                .locationLatCoordinate(0.0)
                .locationLngCoordinate(0.0)
                .locationType("TestLocationType")
                .build();
        String jsonRequestBodyLocation = objectMapper.writeValueAsString(testImportLocationDTO);

        mvc.perform(MockMvcRequestBuilders.post("/locations/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequestBodyLocation)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                            {
                                  "locationName": "TestName",
                                  "locationCity": "TestCity",
                                  "locationDescription": "TestDescription",
                                  "locationLatCoordinate": 0.0,
                                  "locationLngCoordinate": 0.0,
                                  "locationType": "TestLocationType"
                            }
                        """))
                .andExpect(jsonPath("$.locationId").isNotEmpty());


        mvc.perform(MockMvcRequestBuilders.get("/locations/all")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                            [
                                {
                                      "locationName": "TestName",
                                      "locationCity": "TestCity",
                                      "locationDescription": "TestDescription",
                                      "locationLatCoordinate": 0.0,
                                      "locationLngCoordinate": 0.0,
                                      "locationType": "TestLocationType"
                                }
                            ]
                        """))
                .andExpect(jsonPath("$[0].locationId").isNotEmpty());
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "testuser", password = "testpassword")
    void addLocation_thenReturnStatus200_andAddedLocation() throws Exception {
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

        ImportLocationDTO testImportLocationDTO = ImportLocationDTO.builder()
                .locationName("TestName")
                .locationCity("TestCity")
                .locationDescription("TestDescription")
                .locationLatCoordinate(0.0)
                .locationLngCoordinate(0.0)
                .locationType("TestLocationType")
                .build();
        String jsonRequestBodyLocation = objectMapper.writeValueAsString(testImportLocationDTO);

        mvc.perform(MockMvcRequestBuilders.post("/locations/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequestBodyLocation)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                            {
                                  "locationName": "TestName",
                                  "locationCity": "TestCity",
                                  "locationDescription": "TestDescription",
                                  "locationLatCoordinate": 0.0,
                                  "locationLngCoordinate": 0.0,
                                  "locationType": "TestLocationType"
                            }
                        """))
                .andExpect(jsonPath("$.locationId").isNotEmpty());
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "testuser", password = "testpassword")
    void deleteLocation_thenReturnStatus200_andIdOfDeletedLocation() throws Exception {
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

        ImportLocationDTO testImportLocationDTO = ImportLocationDTO.builder()
                .locationName("TestName")
                .locationCity("TestCity")
                .locationDescription("TestDescription")
                .locationLatCoordinate(0.0)
                .locationLngCoordinate(0.0)
                .locationType("TestLocationType")
                .build();
        String jsonRequestBodyLocation = objectMapper.writeValueAsString(testImportLocationDTO);

        MvcResult locationResult = mvc.perform(MockMvcRequestBuilders.post("/locations/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequestBodyLocation)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                            {
                                  "locationName": "TestName",
                                  "locationCity": "TestCity",
                                  "locationDescription": "TestDescription",
                                  "locationLatCoordinate": 0.0,
                                  "locationLngCoordinate": 0.0,
                                  "locationType": "TestLocationType"
                            }
                        """))
                .andExpect(jsonPath("$.locationId").isNotEmpty())
                .andReturn();

        String newLocationId = JsonPath.read(locationResult.getResponse().getContentAsString(), "$.locationId");

        mvc.perform(MockMvcRequestBuilders.delete("/locations/delete/"+newLocationId)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().string(newLocationId));
    }
}