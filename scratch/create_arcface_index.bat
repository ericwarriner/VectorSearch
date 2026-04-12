@echo off
echo Building 512D ArcFace Vector Index...
gcloud firestore indexes composite create --project=ericwarriner2 --collection-group=images4_arcface --query-scope=COLLECTION --field-config field-path=embedding_vector,vector-config="""{""dimension"":512,""flat"":{}}"""
echo Done.
pause
