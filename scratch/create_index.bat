@echo off
echo Building Firestore Vector Index...
gcloud firestore indexes composite create --project=ericwarriner2 --collection-group=images3 --query-scope=COLLECTION --field-config field-path=embedding_vector,vector-config="""{""dimension"":128,""flat"":{}}"""
echo Done.
pause
