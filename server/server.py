#!/usr/bin/python
# -*- coding: utf-8 -*-

from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
from os import curdir, sep

from polyglot.mapping import Embedding

from notebooks.tsne import tsne
from word2vec import transform_text

# from sklearn.manifold import TSNE

PORT_NUMBER = 8080
polish_embeddings = Embedding.load("polyglot-pl.pkl")


# ------------- t-SNE init ------------------------------
# model = TSNE(n_components=2, random_state=0)
# np.set_printoptions(suppress=True)
tsne_rep = tsne(polish_embeddings.vectors)

# This class will handles any incoming request from
# the browser
class myHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path=="/sentence-find-near":
            length = int(self.headers['Content-Length'])
            data = self.rfile.read(length)

            print data
            result = transform_text(polish_embeddings, data)
            print result
            self.send_response(200)
            self.send_header('Content-type','text-plain')
            self.end_headers()
            self.wfile.write(result)
            
        if self.path=="/find-analogy": #TODO
			length = int(self.headers['Content-Length'])
			data = self.rfile.read(length)
			
			print data
			
			self.send_response(200)
			self.send_header('Content-type','text-plain')
			self.end_headers()
			self.wfile.write(data + "dddd")

    #Handler for the GET requests
    def do_GET(self):
        if self.path=="/":
            self.path="/index.html"
        if self.path=="/text-transform":
            self.path="/text-transform.html"
        if self.path=="/intelligent-editor":
            self.path="/intelligent-editor.html"
        if self.path=="/word-cloud":
            self.path="/word-cloud.html"
        if self.path=="/analogies":
			self.path="/analogies.html"

        try:
            #Check the file extension required and
            #set the right mime type

            sendReply = False
            if self.path.endswith(".html"):
                mimetype='text/html'
                sendReply = True
            if self.path.endswith(".jpg"):
                mimetype='image/jpg'
                sendReply = True
            if self.path.endswith(".gif"):
                mimetype='image/gif'
                sendReply = True
            if self.path.endswith(".js"):
                mimetype='application/javascript'
                sendReply = True
            if self.path.endswith(".css"):
                mimetype='text/css'
                sendReply = True

            if sendReply == True:
                #Open the static file requested and send it
                f = open(curdir + sep + self.path)
                self.send_response(200)
                self.send_header('Content-type',mimetype)
                self.end_headers()
                self.wfile.write(f.read())
                f.close()
            return


        except IOError:
            self.send_error(404,'File Not Found: %s' % self.path)

try:
    # Create a web server and define the handler to manage the
    # incoming request
    server = HTTPServer(('', PORT_NUMBER), myHandler)
    print 'Started httpserver on port ', PORT_NUMBER

    # Wait forever for incoming htto requests
    server.serve_forever()

except KeyboardInterrupt:
    print '^C received, shutting down the web server'
    server.socket.close()
