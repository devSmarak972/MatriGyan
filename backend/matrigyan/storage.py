# coding: utf-8

# -------------------------------------------------------------------------
# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License. See License.txt in the project root for
# license information.
# --------------------------------------------------------------------------

"""
FILE: blob_samples_hello_world.py
DESCRIPTION:
    This sample demos basic blob operations like getting a blob client from container, uploading and downloading
    a blob using the blob_client.
USAGE: python blob_samples_hello_world.py
    Set the environment variables with your own values before running the sample:
    1) AZURE_STORAGE_CONNECTION_STRING - the connection string to your storage account
"""

import os
import datetime
from datetime import timedelta
# set up
SOURCE_FILE = 'SampleSource.txt'
DEST_FILE = 'BlockDestination.txt'
import backend.settings as matrigyan_settings
from azure.storage.blob import generate_account_sas,BlobServiceClient,BlobClient,BlobServiceClient, BlobBlock,ContainerClient

class BlobHandler(object):

    connection_string = matrigyan_settings.AZURE_STORAGE_CONNECTIONSTRING
    #--Begin Blob Samples-----------------------------------------------------------------
    accName="matrigyan"
    accKey="lgQbT5xCpYkX6pTc5xY9mnrx5bLtcp+QWSdz+f94y8JCa9Ilp5Ta/C+IV7p9UGWq2GYYcLyogfaW+AStyRSAtw=="
    def create_container1(self,container_name):

        # Instantiate a new BlobServiceClient using a connection string
        blob_service_client = BlobServiceClient.from_connection_string(self.connection_string)

        # Instantiate a new ContainerClient
        container_client = blob_service_client.get_container_client(container_name)

        # try:
        # Create new container in the service
        container_client.create_container()

        # List containers in the storage account
        list_response = blob_service_client.list_containers()
        print(list_response)
    def create_container(self,container_name):
        
        container_client = ContainerClient.from_connection_string(conn_str=self.connection_string, container_name=container_name)

        container_client.create_container()
    def list_containers(self):
        
        blob_service_client = BlobServiceClient.from_connection_string(self.connection_string)
                # List containers in the storage account
        list_response = blob_service_client.list_containers()
        print(list_response)
        # container_client.create_container()

        # finally:
        #     # Delete the container
        #     container_client.delete_container()
    def uploadBlob(self,container_name,blob_name,file):
        blob = BlobClient.from_connection_string(conn_str=self.connection_string, container_name=container_name, blob_name=blob_name)
        # print(blob)
        with file as data:
            blob.upload_blob(data)
            return blob
    def GetBlobUrl(self,containerName,blobName):
        # blobService = BlockBlobService(account_name=accountName, account_key=accountKey)
        # blobService=BlobServiceClient.from_connection_string(self.connection_string)
        # sas_token = generate_account_sas(account_name=self.accName,account_key=self.accKey,containerName,"READ", datetime.utcnow() + timedelta(hours=1))
        sas_token = generate_account_sas(account_name=self.accName,account_key=self.accKey,container_name=containerName,resource_types="co",permission="r",expiry=datetime.datetime.utcnow() + timedelta(hours=24) )
        # print url
        # return 'https://' + self.accName + '.blob.core.windows.net/' + containerName + '/'+blobName+'?' + sas_token
        return 'https://' + self.accName + '.blob.core.windows.net/' + containerName + '/'+blobName+"?"+sas_token
    def downloadBlob(self,container_name,blob_name,filename):
        blob = BlobClient.from_connection_string(conn_str=self.connection_string, container_name=container_name, blob_name=blob_name)

        with open(filename, "wb") as my_blob:
            blob_data = blob.download_blob()
            blob_data.readinto(my_blob)
            return my_blob

    def enumerate_blob(self,container_name):
        container = ContainerClient.from_connection_string(conn_str=self.connection_string, container_name=container_name)

        blob_list = container.list_blobs()
        return blob_list
    def delete_blob(self,container_name,blob_name):
        blob = BlobClient.from_connection_string(conn_str=self.connection_string, container_name=container_name, blob_name=blob_name)
        blob.delete_blob()
    

    def block_blob_sample(self,container_name,blobname):

        # Instantiate a new BlobServiceClient using a connection string
        blob_service_client = BlobServiceClient.from_connection_string(self.connection_string)

        # Instantiate a new ContainerClient
        container_client = blob_service_client.get_container_client(container_name)

        
        # Create new Container in the service
        container_client.create_container()

        # Instantiate a new BlobClient
        blob_client = container_client.get_blob_client(blobname)

        # [START upload_a_blob]
        # Upload content to block blob
        with open(SOURCE_FILE, "rb") as data:
            blob_client.upload_blob(data, blob_type="BlockBlob")
        # [END upload_a_blob]
        # blob_service_client.create_blob_from_bytes( container_name = 'container-name', blob_name = file_upload_name, blob = file.read())
    
    # def download_block_blob(self):
    #                     # [START download_a_blob]
    #         with open(DEST_FILE, "wb") as my_blob:
    #             download_stream = blob_client.download_blob()
    #             my_blob.write(download_stream.readall())
    #         # [END download_a_blob]

    #         # [START delete_blob]
    #         blob_client.delete_blob()
    #         # [END delete_blob]

    #     finally:
    #         # Delete the container
    #         container_client.delete_container()

 
    def stream_block_blob(self,container_name,blob_name):

        import uuid
        # Instantiate a new BlobServiceClient using a connection string - set chunk size to 1MB
        blob_service_client = BlobServiceClient.from_connection_string(self.connection_string,
                                                                       max_single_get_size=1024*1024,
                                                                       max_chunk_get_size=1024*1024)

        # Instantiate a new ContainerClient
        container_client = blob_service_client.get_container_client(container_name)
        # Generate 4MB of data
        data = b'a'*4*1024*1024

        # Create new Container in the service
        container_client.create_container()

        # Instantiate a new source blob client
        source_blob_client = container_client.get_blob_client(blob_name)
        # Upload content to block blob
        # source_blob_client.upload_blob(data, blob_type="BlockBlob")

        # destination_blob_client = container_client.get_blob_client("destination_blob")
        # [START download_a_blob_in_chunk]
        # This returns a StorageStreamDownloader.
        stream = source_blob_client.download_blob()
        block_list = []

        # Read data in chunks to avoid loading all into memory at once
        for chunk in stream.chunks():
            # process your data (anything can be done here really. `chunk` is a byte array).
            block_id = str(uuid.uuid4())
            # destination_blob_client.stage_block(block_id=block_id, data=chunk)
            block_list.append(BlobBlock(block_id=block_id))
            print("stream data from here")

            # [END download_a_blob_in_chunk]

            # Upload the whole chunk to azure storage and make up one blob
            # destination_blob_client.commit_block_list(block_list)


    def page_blob_sample(self):

        # Instantiate a new BlobServiceClient using a connection string
        blob_service_client = BlobServiceClient.from_connection_string(self.connection_string)

        # Instantiate a new ContainerClient
        container_client = blob_service_client.get_container_client("mypagecontainersync")

        try:
            # Create new Container in the Service
            container_client.create_container()

            # Instantiate a new BlobClient
            blob_client = container_client.get_blob_client("mypageblob")

            # Upload content to the Page Blob
            data = b'abcd'*128
            blob_client.upload_blob(data, blob_type="PageBlob")

            # Download Page Blob
            with open(DEST_FILE, "wb") as my_blob:
                download_stream = blob_client.download_blob()
                my_blob.write(download_stream.readall())

            # Delete Page Blob
            blob_client.delete_blob()

        finally:
            # Delete container
            container_client.delete_container()

    def append_blob_sample(self):

        # Instantiate a new BlobServiceClient using a connection string
        blob_service_client = BlobServiceClient.from_connection_string(self.connection_string)

        # Instantiate a new ContainerClient
        container_client = blob_service_client.get_container_client("myappendcontainersync")

        try:
            # Create new Container in the Service
            container_client.create_container()

            # Instantiate a new BlobClient
            blob_client = container_client.get_blob_client("myappendblob")

            # Upload content to the Page Blob
            with open(SOURCE_FILE, "rb") as data:
                blob_client.upload_blob(data, blob_type="AppendBlob")

            # Download Append Blob
            with open(DEST_FILE, "wb") as my_blob:
                download_stream = blob_client.download_blob()
                my_blob.write(download_stream.readall())

            # Delete Append Blob
            blob_client.delete_blob()

        finally:
            # Delete container
            container_client.delete_container()


if __name__ == '__main__':
    sample = BlobHandler()
    # sample.create_container_sample()
    # sample.block_blob_sample()
    # sample.append_blob_sample()
    # sample.page_blob_sample()
    # sample.stream_block_blob()