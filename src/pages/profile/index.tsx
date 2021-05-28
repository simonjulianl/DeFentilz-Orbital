import Layout from "~/components/Layout/Layout";
import React from "react";
import { useAuth } from "~/firebase/auth";
import { Avatar, VStack, Text, } from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout"


const ProfileView = () => {
    const authContext = useAuth();
    return (
        <Layout>
            <VStack>
                <Box>
                    <VStack paddingTop={[10, 50]}>
                        <Avatar size="lg" aria-label="Profile Picture"/>
                            { authContext.auth 
                                ? (
                                    <>
                                        <Text>
                                            {"Display Name: " + authContext.auth.name}
                                        </Text>
                                        <Text>
                                            {"Email Address: " + authContext.auth.email}
                                        </Text>
                                    </>
                                ) : (
                                    <Text align="center">
                                        {"You are not logged in. Please login to see your profile."}
                                    </Text>
                                )
                            }
                    </VStack>
                </Box>
            </VStack>
        </Layout>
    );
}

export default ProfileView;
