# 1. AWS(cloud provider) k under VPC hota h. for each  brand. like netflix has it's own VPC under AWS

# 2. VPC(virtual private network) k under (server and database hote h) and SUNNET hote h

# 3. SUBNET two types k hote h private(can't be access through internet , {DATABASE}) and public(can be access by internet, {SERVER})

# 4. VPC is a isolated network so to connect with internet VPC, Internet Gateway come into picture.

# 5. ALB(Application Load Blancer) redirect request on accordingly
    1. http:// request listen on 80 Port
    2. https:// request listen on 443 Port

# 6. Security Group handle traffic rule. where ALB will listen on port. and allow server to listen on port 3000. BY  DEAFUALT ALL PORTS ARE CLOSED ONLY SG ALLOW THEM TO LISTEN

# 7. Target Group have list of resource where all request traffic will redirect. 

# 8. ECR -> Storage area for image and also store histrory of image build.
--> For build in ECR : docker buildx build --platform linux/amd64 -t shiv-dev:latest . , i git bash use gitbash  

# 9. ECS -> having two parts {task defination} and {services}. 
        -> Task Defination, Define which image to be run with how many CPU and RAM.
        ->  Services, Read Image and Run Image