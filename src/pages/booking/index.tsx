import Layout from "~/components/Layout/Layout";
import React from "react";
import { useAuth } from "~/firebase/auth";
import { Box, VStack, Text } from "@chakra-ui/react";

const MyBookingView = () => {
    const authContext = useAuth();
    return (
        <Layout>
            <VStack>
                <Box>
                    <VStack paddingTop={[10, 50]}>
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
                                        {"You are not logged in. Please login to see your bookings."}
                                    </Text>
                                )
                            }
                    </VStack>
                </Box>
            </VStack>
        </Layout>
    );
}

export default MyBookingView;